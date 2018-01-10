/* jshint esversion:6 */
import * as debug from '../utils/debug';
import { utils } from '../utils/utils';
import { Locale } from '../locale/locale';

/**
 * Component Name
 */
const COMPONENT_NAME = 'listbuilder';

/**
 * Default ListBuilder Options
 */
const LISTBUILDER_DEFAULTS = {
  dataset: [], // Array of data,
  handle: '.handle', // The Class of the handle element

  // Action buttons
  // use "data-action" attributes, ie. data-action="add"
  // or jQuery elements
  btnAdd: 'add',
  btnEdit: 'edit',
  btnDelete: 'delete',
  btnGoUp: 'goup',
  btnGoDown: 'godown',

  // Template HTML
  template: ''+
    '<ul data-handle=".handle">'+
      '{{#dataset}}'+
        '{{#text}}'+
          '<li'+
            '{{#value}} data-value="{{value}}"{{/value}}'+
            '{{#selected}} selected="selected"{{/selected}}'+
            '{{#disabled}} class="is-disabled"{{/disabled}}'+
          '>'+
            '<span class="handle" focusable="false" aria-hidden="true" role="presentation">&#8286;</span>'+
            '<div class="item-content"><p>{{text}}</p></div>'+
          '</li>'+
        '{{/text}}'+
      '{{/dataset}}'+
    '</ul>',

  templateNewItem: ''+
    '<li data-value="{{text}}" role="option">'+
      '<span class="handle" focusable="false" aria-hidden="true" role="presentation">&#8286;</span>'+
      '<div class="item-content"><p>{{text}}</p></div>'+
    '</li>',

  templateItemContent: '<p>{{text}}</p>'
};

/**
* A list of items with add/remove/delete and sort functionality.
*
* @class ListBuilder
* @param {String} element The component element.
* @param {String} settings The component settings.
* @param {Object} dataset The array of data
* @param {String} btnAdd The attribute to match the add button in the toolbar (ie. data-action="add")
* @param {String} btnEdit The attribute to match the edit button in the toolbar (ie. data-action="edit")
* @param {String} btnDelete The attribute to match the delete button in the toolbar (ie. data-action="delete")
* @param {String} btnGoUp The attribute to match the move up button in the toolbar (ie. data-action="goup")
* @param {String} btnGoDown The attribute to match the move up button in the toolbar (ie. data-action="dodown")
* @param {String} template The list view markdown / template.
* @param {String} templateItemContent The markdown for editing an item
*/
function ListBuilder(element, settings) {
  this.settings = utils.mergeSettings(element, settings, LISTBUILDER_DEFAULTS);

  this.element = $(element);
  debug.logTimeStart(COMPONENT_NAME);
  this.init();
  debug.logTimeEnd(COMPONENT_NAME);
}

// ListBuilder Methods
ListBuilder.prototype = {

  init() {
    this
      .loadListview()
      .initDataset()
      .setElements()
      .handleEvents();

    setTimeout(() => {
      this.setSelected();
    }, 0);
  },

  // Load listview
  loadListview() {
    const s = this.settings,
      lv = $('.listview', this.element);

    if (!s.dataset.length && lv.length && $('li', lv).length) {
      this.listApi = lv.listview({selectable: 'single'}).data('listview');
    } else if (lv.length) {
      this.listApi = lv.listview({dataset: s.dataset, template: s.template, selectable: 'single'}).data('listview');
    }
    return this;
  },

  // Init dataset
  initDataset() {
    const s = this.settings,
      nodes = $('.listview li', this.element);

    this.dataset = [];
    for (let i = 0, l = nodes.length; i < l; i++) {
      let data;
      const li = $(nodes[i]);
      if (s.dataset) {
        // Make sure it's not reference pointer to data object, make copy of data
        data = JSON.parse(JSON.stringify(s.dataset[i]));
        data.node = li;
      }
      else {
        data = this.extractNodeData(li);
      }
      this.dataset.push(data);
    }
    return this;
  },

  // Extract node data
  extractNodeData(node) {
    const data = {node: node, text: $.trim($('.item-content', node).text())},
      value = node.attr('data-value');
    if (typeof value !== 'undefined') {
      data.value = value;
    }
    return data;
  },

  // Set elements
  setElements() {
    const s = this.settings;

    // Action buttons
    const setAction = (selector) => {
      return this.isjQuery(selector) ?
        selector : (typeof selector === 'string' ?
          $('[data-action="'+ selector +'"]', this.element) : null);
    };
    s.btnAdd = setAction(s.btnAdd);
    s.btnGoUp = setAction(s.btnGoUp);
    s.btnGoDown = setAction(s.btnGoDown);
    s.btnEdit = setAction(s.btnEdit);
    s.btnDelete = setAction(s.btnDelete);

    // Init tooltips
    this.topButtons = s.btnAdd.add(s.btnGoUp).add(s.btnGoDown).add(s.btnEdit).add(s.btnDelete);
    this.topButtons.tooltip();

    // Make Draggable
    this.ul = $('.listview ul', this.element);
    this.arrangeApi = this.ul.arrange({
      handle: s.handle,
      placeholder: s.templateNewItem
    }).data('arrange');

    return this;
  },

  // Handle Events
  handleEvents() {
    let data;
    const self = this,
      s = self.settings;

    // TOP BUTTONS =============================================================
    const topButtonsClick = (btn, method) => {
      btn.offTouchClick('listbuilder').off('click.listbuilder')
        .onTouchClick('listbuilder').on('click.listbuilder', () => {
        self[method]();
      });
    };
    topButtonsClick(s.btnAdd, 'addItem');
    topButtonsClick(s.btnGoUp, 'moveItemUp');
    topButtonsClick(s.btnGoDown, 'moveItemDown');
    topButtonsClick(s.btnEdit, 'editItem');
    topButtonsClick(s.btnDelete, 'deleteItem');

    // DRAGGABLE ===============================================================
    this.arrangeApi.element
    .on('beforearrange.listbuilder', (e, status) => {
      const d = this.getDataByNode(status.start),
        str = s.templateItemContent.replace(/{{text}}/g, d.data.text);

      this.arrangeApi.placeholders.attr('data-value', d.data.text)
        .find('.item-content').html(str);
    })
    .on('arrangeupdate.listbuilder', (e, status) => {
      this.updateAttributes();
      this.arrayIndexMove(this.dataset, status.startIndex, status.endIndex);
      data = this.getDataByNode(status.end);
      data.indexBeforeMove = status.startIndex;
      this.element.triggerHandler('arrangeupdate', [data]);
    });

    $('li:not(.is-disabled) '+ this.arrangeApi.handle, this.ul)
      .on('mousedown.listbuilder touchstart.listbuilder', function() {
        const li = $(this);
        if (!li.is('.is-selected')) {
          li.trigger('click');
        }
      });

    $('.listview', this.element)
      .off('selected.listbuilder')
      .on('selected.listbuilder', (e, args) => {
        data = this.getDataByNode(args.elem[0]);

        /**
        * Fires when a item is selected.
        *
        * @event selected
        * @type {Object}
        * @property {Object} event - The jquery event object
        * @property {Object} data - Data for this selected item
        */
        this.element.triggerHandler('selected', [data]);
      });

    this.updatedEventsStr = 'arrangeupdate.listbuilder aftergoup.listbuilder aftergodown.listbuilder exiteditmode.listbuilder';
    this.element
      .off(this.updatedEventsStr)
      .on(this.updatedEventsStr, (e, data) => {
        /**
        * Fires when a item is updated.
        *
        * @event updated
        * @type {Object}
        * @property {Object} event - The jquery event object
        * @property {Object} data - Data for this item
        */
        this.element.triggerHandler('updated', [data]);
      });

    return this;
  }, // END: Handle Events -----------------------------------------------------

  /**
  * Add an item into edit node.
  * @returns {void}
  */
  addItem() {
    const self = this,
      s = this.settings;

    /**
    * Fires before add new item.
    *
    * @event beforeadd
    * @type {Object}
    * @property {Object} event - The jquery event object
    */
    $.when(this.element.triggerHandler('beforeadd')).done(function() {
      let li, data,
        index = 0;

      const node = self.listApi.selectedItems[0],
        str = s.templateNewItem.replace(/{{text}}/g, Locale.translate('NewItem'));

      if (node && node.length > 0) {
        data = self.getDataByNode(node);
        index = data.index + 1;
        $(str).insertAfter(node);
        li = $('li', self.ul).eq(index);
      }
      else {
        self.ul.prepend(str);
        li = $('li:first-child', self.ul);
      }

      self.dataset.push(self.extractNodeData(li));
      self.arrayIndexMove(self.dataset, self.dataset.length - 1, index);
      self.updateAttributes();
      li.trigger('click');
      self.arrangeApi.updated();
      self.editItem(true);

      data = {index: index, data: self.dataset[index]};

      /**
      * Fires after add new item.
      *
      * @event afteradd
      * @type {Object}
      * @property {Object} event - The jquery event object
      * @property {Object} data - Data for this new item
      */
      self.element.triggerHandler('afteradd', [data]);
    });
  },

  /**
  * Move the currently selected item up.
  * @returns {void}
  */
  moveItemUp() {
    const self = this,
      node = self.listApi.selectedItems[0];
    if (node && node.length > 0) {
      const data = self.getDataByNode(node);
      if (typeof data.index !== 'undefined' && data.index > 0) {
        /**
        * Fires before move up item.
        *
        * @event beforegoup
        * @type {Object}
        * @property {Object} event - The jquery event object
        * @property {Object} data - Data for this item
        */
        $.when(self.element.triggerHandler('beforegoup', [data])).done(function() {
          const prev = node.prev();
          node.insertBefore(prev);
          self.updateAttributes();
          self.arrayIndexMove(self.dataset, data.index, data.index - 1);
          data.indexBeforeMove = data.index;
          data.index = data.index - 1;

          /**
          * Fires after move up item.
          *
          * @event aftergoup
          * @type {Object}
          * @property {Object} event - The jquery event object
          * @property {Object} data - Data for this item
          */
          self.element.triggerHandler('aftergoup', [data]);
        });
      }
    }
  },

  /**
  * Move the currently selected item down.
  * @returns {void}
  */
  moveItemDown() {
    const self = this,
      node = self.listApi.selectedItems[0];
    if (node && node.length > 0) {
      const data = self.getDataByNode(node);
      if (typeof data.index !== 'undefined' && data.index < self.dataset.length - 1) {
        /**
        * Fires before move down item.
        *
        * @event beforegodown
        * @type {Object}
        * @property {Object} event - The jquery event object
        * @property {Object} data - Data for this item
        */
        $.when(self.element.triggerHandler('beforegodown', [data])).done(function() {
          const next = node.next();
          node.insertAfter(next);
          self.updateAttributes();
          self.arrayIndexMove(self.dataset, data.index, data.index + 1);
          data.indexBeforeMove = data.index;
          data.index = data.index + 1;

          /**
          * Fires after move down item.
          *
          * @event aftergodown
          * @type {Object}
          * @property {Object} event - The jquery event object
          * @property {Object} data - Data for this item
          */
          self.element.triggerHandler('aftergodown', [data]);
        });
      }
    }
  },

  /**
  * Edit the selected item
  * @param {Boolean} isNewItem  Is it a newly added item?
  * @returns {void}
  */
  editItem(isNewItem) {
    const node = this.listApi.selectedItems[0];
    if (node && node.length > 0) {
      if (node.is('.is-editing')) {
        this.commitEdit(node, isNewItem);
      } else {
        this.makeEditable(node, isNewItem);
      }
    }
  },

  /**
  * Make the node editable
  * @param {Object} node  The HTML element to edit
  * @param {Boolean} isNewItem  Is it a newly added item?
  * @returns {void}
  */
  makeEditable(node, isNewItem) {
    const self = this,
      data = self.getDataByNode(node),
      container = $('.item-content', node);

    if (typeof data.index !== 'undefined' && data.index < self.dataset.length) {
      /**
      * Fires before edit item.
      *
      * @event beforeedit
      * @type {Object}
      * @property {Object} event - The jquery event object
      * @property {Object} data - Data for this item
      */
      $.when(self.element.triggerHandler('beforeedit', [data])).done(function() {
        const origValue = container.text().trim(),
          editInput = $('<input name="edit-input" class="edit-input" type="text" value="'+ origValue +'" />');

        node.addClass('is-editing');
        container.html(editInput);
        editInput.focus().select();

        editInput
        .on('click.listbuilder', () => false)
        .on('blur.listbuilder', () => self.commitEdit(node, isNewItem))
        .on('keypress.listbuilder', (e) => {
          const key = e.keyCode || e.charCode || 0;
          if (key === 13) {
            self.commitEdit(node, isNewItem);
            node.focus();
          }
        });

        /**
        * Fires when enter to edit mode.
        *
        * @event entereditmode
        * @type {Object}
        * @property {Object} event - The jquery event object
        * @property {Object} data - Data for this item
        */
        self.element.triggerHandler('entereditmode', [data]);
      });
    }
  },

  /**
  * Commit the changes to item.
  * @param {Object} node  The HTML element to commit changes
  * @param {Boolean} isNewItem  Is it a newly added item?
  * @returns {void}
  */
  commitEdit(node, isNewItem) {
    const s = this.settings,
      data = this.getDataByNode(node),
      container = $('.item-content', node),
      editInput = $('.edit-input', container);

    if (isNewItem) {
      data.data.value = editInput.val();
    }
    data.data.text = editInput.val();
    editInput.off('click.listbuilder blur.listbuilder keypress.listbuilder');
    container.html(s.templateItemContent.replace(/{{text}}/g, editInput.val()));
    node.removeClass('is-editing');

    /**
    * Fires when exited to edit mode.
    *
    * @event exiteditmode
    * @type {Object}
    * @property {Object} event - The jquery event object
    * @property {Object} data - Data for this item
    */
    this.element.triggerHandler('exiteditmode', [data]);
  },

  /**
  * Delete the selected item.
  * @returns {void}
  */
  deleteItem() {
    const self = this,
      node = self.listApi.selectedItems[0];
    if (node && node.length > 0) {
      const data = self.getDataByNode(node);
      if (typeof data.index !== 'undefined') {
        /**
        * Fires before delete item.
        *
        * @event beforedelete
        * @type {Object}
        * @property {Object} event - The jquery event object
        * @property {Object} data - Data for this item
        */
        $.when(self.element.triggerHandler('beforedelete', [data])).done(function() {
          self.listApi.removeAllSelected();
          self.updateAttributes();
          self.dataset.splice(data.index, 1);

          /**
          * Fires after delete item.
          *
          * @event afterdelete
          * @type {Object}
          * @property {Object} event - The jquery event object
          * @property {Object} data - Data for this item
          */
          self.element.triggerHandler('afterdelete', [data]);
        });
      }
    }
  },

  /**
  * Get data from dataset by node
  * @param {Object} node  The HTML element to get data
  * @returns {Object}
  */
  getDataByNode(node) {
    let data = {};
    for (let i = 0, l = this.dataset.length; i < l; i++) {
      const d = this.dataset[i];
      if ($(d.node).is(node)) {
        data = {index: i, data: d};
        break;
      }
    }
    return data;
  },

  // Move an array element position
  arrayIndexMove(arr, from, to) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
  },

  // Check if given object is a jQuery object
  isjQuery(obj) {
    return (obj && (obj instanceof jQuery || obj.constructor.prototype.jquery));
  },

  // Move cursor to end
  // http://stackoverflow.com/a/26900921
  moveCursorToEnd(el) {
    setTimeout(() => {
      if (typeof el.selectionStart === 'number') {
        el.selectionStart = el.selectionEnd = el.value.length;
      } else if (typeof el.createTextRange !== 'undefined') {
        const range = el.createTextRange();
        range.collapse(false);
        range.select();
      }
    }, 100);
  },

  // Update attributes
  updateAttributes() {
    const nodes = $('li', this.ul);

    for (let i = 0, l = nodes.length; i < l; i++) {
      $(nodes[i]).attr({'aria-posinset': i + 1, 'aria-setsize': l});
    }
  },

  // Update dataset
  updateDataset(ds) {
    const nodes = $('li', this.ul),
      lv = $('.listview', this.element).data('listview');

    lv.deselectItemsBetweenIndexes([0, nodes.length-1]);
    this.settings.dataset = ds;
    lv.loadData(this.settings.dataset);

    this
      .initDataset()
      .setElements()
      .handleEvents();

    setTimeout(() => {
      this.setSelected();
    }, 0);
  },

  // Set pre selected items
  setSelected() {
    const nodes = $('li[selected]', this.ul);
    for (let i = 0, l = nodes.length; i < l; i++) {
      const li = $(nodes[i]);
      li.removeAttr('selected');
      if (!li.is('.is-selected')) {
        li.trigger('click');
      }
    }
    return this;
  },

  // Make selected
  select(selector) {
    const li = this.getListItem(selector);

    if (li && !li.is('.is-selected')) {
      li.trigger('click');
    }
  },

  // Make unselected
  unselect(selector) {
    const li = this.getListItem(selector);

    if (li && li.is('.is-selected')) {
      li.trigger('click');
    }
  },

  // Get an item from list, selector: can be
  // jQuery, DOM element, zero based index or 'first'|'last' as string
  getListItem(selector) {
    let li = $();
    if (this.isElement(selector) && $.contains(this.ul, selector)) {
      li = this.isjQuery(selector) ? selector : $(selector);
    } else {
      const idx = parseInt(selector),
        items = $('li', this.ul);
      if (!isNaN(idx) && (idx > -1 && idx < items.length)) {
        li = items.eq(idx); // zero based index
      } else if ((selector + '').toLowerCase() === 'first') {
        li = items.first(); // first
      } else if ((selector + '').toLowerCase() === 'last') {
        li = items.last(); // last
      }
    }
    // Make sure to return only one item -or- null
    return (li.length < 1) ? null : ((li.length > 1) ? li.eq(0) : li);
  },

  // Check if given object is a DOM object
  isElement(obj) {
    return (this.isjQuery(obj) && obj.get(0) instanceof Element) || obj instanceof Element;
  },

  /**
  * Make enable.
  * @returns {void}
  */
  enable() {
    this.element.removeClass('is-disabled')
      .find('.toolbar .buttonset button').removeAttr('disabled').end()
      .find('.toolbar .buttonset button[data-original-disabled]')
        .attr('disabled', 'disabled').removeAttr('data-original-disabled');

    this.ul
      .find('li').removeClass('is-disabled').end()
      .find('li[data-original-disabled]').addClass('is-disabled').removeAttr('data-original-disabled');
  },

  /**
  * Make disable.
  * @returns {void}
  */
  disable() {
    this.element.addClass('is-disabled')
      .find('.toolbar .buttonset button[disabled]').attr('data-original-disabled', 'disabled').end()
      .find('.toolbar .buttonset button').attr('disabled', 'disabled');

    this.ul
      .find('li.is-disabled').attr('data-original-disabled', 'is-disabled').end()
      .find('li').addClass('is-disabled');
  },

  // Unbind all events
  unbind() {
    this.element.off(this.updatedEventsStr);
    $('.listview', this.element).off('selected.listbuilder');

    $('li '+ this.arrangeApi.handle, this.ul)
      .off('mousedown.listbuilder touchstart.listbuilder');

    this.arrangeApi.element
      .off('beforearrange.listbuilder arrangeupdate.listbuilder').destroy();

    this.topButtons.off('click.listbuilder');
    if (this.topButtons) {
      for (let i = 0, l = this.topButtons.length; i < l; i++) {
        const tooltipApi = $(this.topButtons[i]).data('tooltip');
        if (tooltipApi && typeof tooltipApi.destroy === 'function') {
          tooltipApi.destroy();
        }
      }
    }

    if (this.listApi && typeof this.listApi.destroy === 'function') {
      this.listApi.destroy();
    }

    return this;
  },

  /**
   * Resync the UI and Settings.
   * @param {Object} settings The settings to apply.
   * @returns {Object} The api
   */
  updated(settings) {
    if (typeof settings !== 'undefined') {
      this.settings = utils.mergeSettings(this.element, settings, LISTBUILDER_DEFAULTS);
    }
    return this
      .unbind()
      .init();
  },

  /**
  * Teardown process for this plugin
  * @returns {void}
  */
  destroy() {
    this.unbind();
    $.removeData(this.element[0], COMPONENT_NAME);
  }
};

export { ListBuilder, COMPONENT_NAME };
