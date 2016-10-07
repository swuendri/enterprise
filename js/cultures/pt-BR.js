(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define('cultures/pt-BR', ['jquery'], factory);
    factory();
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function () {

  if (!Locale) {
    return;
  }

  //Get Latest from http://www.unicode.org/Public/cldr/25/
  Locale.addCulture('pt-BR', {
    //layout/language
    language: 'pt',
    englishName: 'Portuguese (Brazil)',
    nativeName: 'Português (Brasil)',
    //layout/orientation/@characters
    direction: 'left-to-right',
    //ca-gregorian
    calendars: [{
      name: 'gregorian',
      //ca-gregorian/main/dates/calendars/gregorian/dateFormats/
      dateFormat: {'separator': '/', //Infered
                   'timeSeparator': ':',
                   'short': 'dd/MM/yyyy', //use four digit year
                   'medium': 'dd/MM/yyyy',
                   'long': 'd de MMMM de yyyy',
                   'full': 'EEEE, d de MMMM de yyyy',
                   'month': 'd de MMMM',
                   'year': 'MMMM de yyyy',
                   'timestamp': 'HH:mm:ss',
                   'datetime': 'dd/MM/yyyy HH:mm'}, //Infered short + short gregorian/dateTimeFormats
      //ca-gregorian/main/dates/calendars/gregorian/days/format/short or abbreviated (2 digit)
      days: {
         wide: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
         abbreviated: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
         narrow: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
      },
      //ca-gregorian/main/dates/calendars/gregorian/months/format/wide
      months: {
        wide: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
        abbreviated: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
      },
      //ca-gregorian/main/dates/calendars/gregorian/timeFormats/short
      timeFormat: 'HH:mm',
      //ca-gregorian/main/dates/calendars/gregorian/dayPeriods/wide
      dayPeriods: ['AM', 'PM']
    }],
    //numbers/currencyFormats-numberSystem-latn/standard (Replace Sign http://www.currencysymbols.in ?)
    currencySign: 'R$', //(Replace Sign http://www.currencysymbols.in ?)
    currencyFormat: '¤#,##0.00',
    //numbers/symbols-numberSystem-latn
    numbers: {
      percentSign: '%',
      percentFormat: '#,##0 %',
      minusSign: '-',
      decimal: ',',
      group: '.'
    },
    //Resx - Approved By Translation Team
    messages: {
      'AboutText': {id: 'AboutText', value: 'Copyright &copy; {0} Infor. Todos os direitos reservados. Os nomes e os logotipos de marcas aqui contidos são marcas comerciais e/ou marcas registradas da Infor e/ou de suas afiliadas e subsidiárias. Todos os direitos reservados. Todas as outras marcas comerciais relacionadas aqui são de propriedade de seus respectivos proprietários.'},
      'Actions': {id: 'Actions', value: 'Ações', comment: 'Tooltip text for the action button with additional in context actions'},
      'Add': {id: 'Add', value: 'Adicionar', comment: 'Add'},
      'AddNewTab': {id: 'AddNewTab', value: 'Adicionar nova guia', comment: 'Attached to a button that adds new tabs'},
      'AdvancedFilter': {id: 'AdvancedFilter', value: 'Criar filtro avançado', comment: 'In a data grid active an advanced filtering feature'},
      'Alert': {id: 'Alert', value: 'Alerta', comment: 'Alert'},
      'AllResults': {id: 'AllResults', value: 'Todos os resultados para', comment: 'Search Results Text'},
      'AligntoBottom': {id: 'AligntoBottom', value: 'Alinhar abaixo', comment: 'Align to Bottom tooltip'},
      'AlignCenterHorizontally': {id: 'AlignCenterHorizontally', value: 'Alinhar horizontalmente ao centro', comment: 'Align Center Horizontally tooltip'},
      'Amber': {id: 'Amber', value: 'Âmbar', comment: 'Color in our color pallette'},
      'Amethyst': {id: 'Amethyst', value: 'Ametista', comment: 'Color in our color pallette'},
      'Apply': {id: 'Apply', value: 'Aplicar', comment: 'Text in a button to apply an action'},
      'Attach': {id: 'Attach', value: 'Anexar', comment: 'Attach'},
      'Azure': {id: 'Azure', value: 'Azure', comment: 'Color in our color pallette'},
      'Between': {id: 'Between', value: 'Entre', comment: 'Between in icons for filtering'},
      'Blockquote': {id: 'Blockquote', value: 'Citação em bloco', comment: 'insert a block quote in the editor'},
      'Bold': {id: 'Bold', value: 'Negrito', comment: 'Make text Bold'},
      'Bookmarked': {id: 'Bookmarked', value: 'Marcado', comment: 'Bookmark filled - Element is already bookmarked'},
      'BookmarkThis': {id: 'BookmarkThis', value: 'Indicar esta', comment: 'Bookmark an element'},
      'Breadcrumb': {id: 'Breadcrumb', value: 'Navegação estrutural', comment: 'Text describing the Breadcrumb'},
      'BulletedList': {id: 'BulletedList', value: 'Lista com marcadores', comment: 'Bulleted List tooltip'},
      'Calendar': {id: 'Calendar', value: 'Calendário', comment: 'Inline Text for the title of the Calendar control'},
      'Camera': {id: 'Camera', value: 'Câmera', comment: 'Camera tooltip'},
      'Cancel': {id: 'Cancel', value: 'Cancelar', comment: 'Cancel tooltip'},
      'CapsLockOn': {id: 'CapsLockOn', value: 'Tecla Caps Lock ativada', comment: 'Caps Lock On message'},
      'Cart': {id: 'Cart', value: 'Carrinho', comment: 'Cart tooltip'},
      'CenterText': {id: 'CenterText', value: 'Centralizar', comment: 'An Icon Tooltip'},
      'CharactersLeft': {id: 'CharactersLeft', value: 'Caracteres à esquerda {0}', comment: 'indicator showing how many more characters you can type.'},
      'CharactersMax': {id: 'CharactersMax', value: 'Número máximo de caracteres ', comment: 'indicator showing how many max characters you can type.'},
      'ChangeSelection': {id: 'ChangeSelection', value: '. Para alterar a seleção use as teclas de seta.', comment: 'Audible Text for drop down list help'},
      'Checkbox': {id: 'Checkbox', value: 'Caixa de seleção', comment: 'Checkbox tooltip'},
      'Checked': {id: 'Checked', value: 'Marcado', comment: 'Checked tooltip'},
      'Clear': {id: 'Clear', value: 'Limpar', comment: 'Tooltip for a Clear Action'},
      'ClearFilter': {id: 'ClearFilter', value: 'Limpar filtro', comment: 'Clear the current filter criteria'},
      'Clock': {id: 'Clock', value: 'Relógio', comment: 'Clock tooltip'},
      'Close': {id: 'Close', value: 'Fechar', comment: 'Tooltip for a Close Button Action'},
      'Copy': {id: 'Copy', value: 'Copiar', comment: 'Copy tooltip'},
      'Collapse': {id: 'Collapse', value: 'Recolher', comment: 'Collapse / close a tree/submenu'},
      'CollapseAppTray': {id: 'CollapseAppTray', value: 'Recolher bandeja de aplicativos', comment: 'Collapse App Tray tooltip'},
      'Columns': {id: 'Columns', value: 'Colunas', comment: 'Columns tooltip'},
      'Component': {id: 'Component', value: 'Componente', comment: 'As in a UI component - building block.'},
      'Compose': {id: 'Compose', value: 'Compor', comment: 'Compose tooltip'},
      'Completed': {id: 'Completed', value: 'Concluído', comment: 'Text For a Completed Status'},
      'Confirm': {id: 'Confirm', value: 'Confirmar', comment: 'Confirm tooltip'},
      'Contains': {id: 'Contains', value: 'Contém', comment: 'Contains in icons for filtering'},
      'Cut': {id: 'Cut', value: 'Cortar', comment: 'Cut tooltip'},
      'Date': {id: 'Date', value: 'Data', comment: 'Describes filtering by a date data type'},
      'Delete': {id: 'Delete', value: 'Excluir', comment: 'Delete Toolbar Action Tooltip'},
      'DistributeHoriz': {id: 'DistributeHoriz', value: 'Distribuir horizontalmente', comment: 'Icon button tooltip for action that distributes elements across Horizontally'},
      'Document': {id: 'Document', value: 'Documento', comment: 'Document tooltip'},
      'Dirty': {id: 'Dirty', value: 'A linha foi alterada', comment: 'Record is dirty / modified'},
      'Drilldown': {id: 'Drilldown', value: 'Busca detalhada', comment: 'Drill by moving page flow into a record'},
      'Drillup': {id: 'Drillup', value: 'Menos detalhes', comment: 'Opposite of Drilldown, move back up to a larger set of records'},
      'Dropdown': {id: 'Dropdown', value: 'Lista suspensa', comment: 'Dropdown'},
      'DoesNotContain': {id: 'DoesNotContain', value: 'Não contém', comment: 'Does Not Contain in icons for filtering'},
      'DoesNotEndWith': {id: 'DoesNotEndWith', value: 'Não termina com', comment: 'For condition filtering'},
      'DoesNotEqual': {id: 'DoesNotEqual', value: 'Não é igual a', comment: 'Does Not Equal in icons for filtering'},
      'DoesNotStartWith': {id: 'DoesNotStartWith', value: 'Não começa com', comment: 'For condition filtering'},
      'Down': {id: 'Down', value: 'Para baixo', comment: 'Down tooltip'},
      'Download': {id: 'Download', value: 'Fazer download', comment: 'Download tooltip'},
      'Duplicate': {id: 'Duplicate', value: 'Duplicar', comment: 'Duplicate tooltip'},
      'EitherSelectedOrNotSelected': {id: 'EitherSelectedOrNotSelected', value: 'Selecionado ou não selecionado', comment: 'Either Selected Or NotSelected in icons for filtering'},
      'EndWith': {id: 'EndWith', value: 'Termina com', comment: 'for condition filtering'},
      'EnterComments': {id: 'EnterComments', value: 'Insira comentários aqui...', comment: 'Placeholder text for a text input (comments)'},
      'Error': {id: 'Error', value: 'Erro', comment: 'Title, Spoken Text describing fact an error has occured'},
      'ErrorAllowedTypes': {id: 'ErrorAllowedTypes', value: 'O tipo de arquivo não é permitido', comment: 'Error string for file-upload'},
      'ErrorMaxFileSize': {id: 'ErrorMaxFileSize', value: 'O limite de tamanho de arquivo foi ultrapassado', comment: 'Error string for file-upload'},
      'ErrorMaxFilesInProcess': {id: 'ErrorMaxFilesInProcess', value: 'O máximo de arquivos permitido foi ultrapassado', comment: 'Error string for file-upload'},
      'EmailValidation': {id: 'EmailValidation', value: 'Endereço de e-mail não é válido', comment: 'This the rule for email validation'},
      'Emerald': {id: 'Emerald', value: 'Esmeralda', comment: 'Color in our color pallette'},
      'Expand': {id: 'Expand', value: 'Expandir', comment: 'Expand open a tree/submenu'},
      'ExpandAppTray': {id: 'ExpandAppTray', value: 'Expandir bandeja de aplicativos', comment: 'ExpandAppTray tooltip'},
      'ExpandCollapse': {id: 'ExpandCollapse', value: 'Expandir/Recolher', comment: 'Text to toggle a button in a container.'},
      'ExportAsSpreadsheet': {id: 'ExportAsSpreadsheet', value: 'Exportar como planilha', comment: 'Export as Spreadsheet tooltip'},
      'Edit': {id: 'Edit', value: 'Editar', comment: 'Edit tooltip'},
      'Equals': {id: 'Equals', value: 'É igual a', comment: 'Equals in icons for filtering'},
      'ExitFullView': {id: 'ExitFullView', value: 'Sair de Tela inteira', comment: 'Exit Full View tooltip'},
      'Export': {id: 'Export', value: 'Exportar', comment: 'Export tooltip'},
      'ExportToExcel': {id: 'ExportToExcel', value: 'Exportar para Excel', comment: 'Export To Excel menu option in datagrid'},
      'Favorite': {id: 'Favorite', value: 'Favoritos', comment: 'A favorite item'},
      'FileUpload': {id: 'FileUpload', value: 'Carregamento de arquivo. Pressione Enter para buscar um arquivo', comment: 'Screen Reader instructions'},
      'Filter': {id: 'Filter', value: 'Filtro', comment: 'Filter tooltip'},
      'FirstPage': {id: 'FirstPage', value: 'Primeira página', comment: 'First Page tooltip'},
      'Folder': {id: 'Folder', value: 'Pasta', comment: 'Folder tooltip'},
      'FullView': {id: 'FullView', value: 'Tela inteira', comment: 'Full View tooltip'},
      'GoForward': {id: 'GoForward', value: 'Avançar', comment: 'Move Page / object this direction'},
      'GoBack': {id: 'GoBack', value: 'Voltar', comment: 'Move Page / object this directionp'},
      'GoDown': {id: 'GoDown', value: 'Baixar', comment: 'Move Page / object this directionp'},
      'GoUp': {id: 'GoUp', value: 'Subir', comment: 'Move Page / object this direction'},
      'Graphite': {id: 'Graphite', value: 'Grafite', comment: 'Color in our color pallette'},
      'GreaterOrEquals': {id: 'GreaterOrEquals', value: 'Maior que ou igual a', comment: 'Greater Than Or Equals in icons for filtering'},
      'GreaterThan': {id: 'GreaterThan', value: 'É maior que', comment: 'Greater Than in icons for filtering'},
      'Grid': {id: 'Grid', value: 'Grade', comment: 'Grid tooltip'},
      'Hours': {id: 'Hours', value: 'Horas', comment: 'the hour portion of a time'},
      'HeadingThree': {id: 'HeadingThree', value: 'Cabeçalho três', comment: 'Heading Three tooltip'},
      'HeadingFour': {id: 'HeadingFour', value: 'Cabeçalho quatro', comment: 'Heading Four tooltip'},
      'Highest': {id: 'Highest', value: 'Mais alto', comment: 'Highest Four tooltip'},
      'Home': {id: 'Home', value: 'Início', comment: 'Home tooltip'},
      'HtmlView': {id: 'HtmlView', value: 'Visualização em Html', comment: 'Html View tooltip'},
      'Image': {id: 'Image', value: 'Imagem', comment: 'Image of something'},
      'Import': {id: 'Import', value: 'Importar', comment: 'Import tooltip'},
      'Info': {id: 'Info', value: 'Informações', comment: 'Info tooltip'},
      'InProgress': {id: 'In Progress', value: 'Em andamento', comment: 'Info tooltip that an action is in progress'},
      'InsertAnchor': {id: 'InsertAnchor', value: 'Inserir âncora', comment: 'Insert Acnhor (link) in an editor'},
      'InsertImage': {id: 'InsertImage', value: 'Inserir imagem', comment: 'Insert Image in an editor'},
      'Italic': {id: 'Italic', value: 'Itálico', comment: 'Make Text Italic'},
      'InvalidDate': {id: 'InvalidDate', value: 'Data inválida', comment: 'validation message for wrong date format (short)'},
      'InvalidTime': {id: 'InvalidTime', value: 'Hora inválida', comment: 'validation message for wrong time format'},
      'Inventory': {id: 'Inventory', value: 'Inventário', comment: 'Icon button tooltop for Inventory Action'},
      'IsEmpty': {id: 'IsEmpty', value: 'Está vazio', comment: 'Is Empty in icons for filtering'},
      'IsNotEmpty': {id: 'IsNotEmpty', value: 'Não está vazio', comment: 'Is Not Empty in icons for filtering'},
      'ItemsSelected': {id: 'ItemsSelected', value: 'Itens selecionados', comment: 'Num of Items selected for swaplist'},
      'JustifyCenter': {id: 'JustifyCenter', value: 'Centralizar', comment: 'justify text to center in the editor'},
      'JustifyLeft': {id: 'JustifyLeft', value: 'Alinhar à esquerda', comment: 'justify text to left in the editor'},
      'JustifyRight': {id: 'JustifyRight', value: 'Alinhar à direita', comment: 'justify text to right in the editor'},
      'Keyword': {id: 'Keyword', value: 'Palavra-chave', comment: 'Describes filtering by a keyword search'},
      'Launch': {id: 'Launch', value: 'Iniciar', comment: 'Launch'},
      'LastPage': {id: 'LastPage', value: 'Última página', comment: 'Last Page tooltip'},
      'Left': {id: 'Left', value: 'Esquerda', comment: 'Left tooltip'},
      'LessOrEquals': {id: 'LessOrEquals', value: 'Menor que ou igual a', comment: 'Less Than Or Equals in icons for filtering'},
      'LessThan': {id: 'LessThan', value: 'É menor que', comment: 'Less Than in icons for filtering'},
      'Link': {id: 'Link', value: 'Link', comment: 'Link - as in hyperlink - icon tooltop'},
      'Load': {id: 'Load', value: 'Carregar', comment: 'Load icon tooltip'},
      'Loading': {id: 'Loading', value: 'Carregando', comment: 'Text below spinning indicator to indicate loading'},
      'Locked': {id: 'Locked', value: 'Bloqueado', comment: 'Locked tooltip'},
      'Logout': {id: 'Logout', value: 'Desconectar', comment: 'Log out of the application'},
      'Lookup': {id: 'Lookup', value: 'Busca', comment: 'Lookup - As in looking up a record or value'},
      'Lowest': {id: 'Lowest', value: 'Mais baixo', comment: 'Lowest - As in Lowest value'},
      'Mail': {id: 'Mail', value: 'Email', comment: 'Mail tooltip'},
      'MapPin': {id: 'MapPin', value: 'Marcar', comment: 'Map Pin tooltip'},
      'Maximize': {id: 'Maximize', value: 'Maximizar', comment: 'Maximize a screen or dialog in the UI'},
      'Median': {id: 'Median', value: 'Mediano', comment: 'Median in Mathematics'},
      'Medium': {id: 'Medium', value: 'Médio', comment: 'Describes a Medium sized Row Height in a grid/list'},
      'Menu': {id: 'Menu', value: 'Menu', comment: 'Menu tooltip'},
      'MingleShare': {id: 'MingleShare', value: 'Compartilhar com o Ming.le', comment: 'Share the contextual object/action in the mingle system'},
      'Minutes': {id: 'Minutes', value: 'Minutos', comment: 'the minutes portion of a time'},
      'Minimize': {id: 'Minimize', value: 'Minimizar', comment: 'Minimize tooltip'},
      'Minus': {id: 'Minus', value: 'Menos', comment: 'Minus tooltip'},
      'Mobile': {id: 'Mobile', value: 'Celular', comment: 'Indicates a mobile device (phone tablet ect)'},
      'More': {id: 'More', value: 'Mais...', comment: 'Text Indicating More Buttons or form content'},
      'MoreActions': {id: 'MoreActions', value: 'Mais ações', comment: 'Text on the More Actions button indictating hidden functions'},
      'MsgDirty': {id: 'MsgDirty', value: ', Modificado', comment: 'for modified form fields'},
      'NewDocument': {id: 'NewDocument', value: 'Novo documento', comment: 'New Document tooltip'},
      'Next': {id: 'Next', value: 'Próximo', comment: 'Next in icons tooltip'},
      'NextPage': {id: 'NextPage', value: 'Próxima página', comment: 'Next on Pager'},
      'NextMonth': {id: 'NextMonth', value: 'Próximo mês', comment: 'the label for the button that moves calendar to next/prev'},
      'No': {id: 'No', value: 'Não', comment: 'On a dialog button'},
      'NoResults': {id: 'NoResults', value: 'Nenhum resultado', comment: 'Search Results Text'},
      'Normal': {id: 'Normal', value: 'Normal', comment: 'Normal row height'},
      'Notes': {id: 'Notes', value: 'Notas', comment: 'Notes icon tooltip'},
      'NotSelected': {id: 'NotSelected', value: 'Não selecionado', comment: 'Not Selected in icons for filtering'},
      'NumberList': {id: 'NumberList', value: 'Lista numerada', comment: 'Number List tooltip'},
      'OpenBackClose': {id: 'OpenBackClose', value: 'Abrir/Voltar/Fechar', comment: 'Open / Back / Close tooltip'},
      'OpenClose': {id: 'OpenClose', value: 'Abrir/Fechar', comment: 'Open / Close tooltip'},
      'OrderedList': {id: 'OrderedList', value: 'Inserir/remover lista numerada', comment: 'Insert an Ordered list in the editor'},
      'Page': {id: 'Page', value: 'página ', comment: 'Text on the pager links'},
      'PageOf': {id: 'PageOf', value: 'Página {0} de {1}', comment: 'Pager Text Showing current and number of pages'},
      'PageOn': {id: 'PageOn', value: 'Você está atualmente na página ', comment: 'Text on the pager links'},
      'Paste': {id: 'Paste', value: 'Colar', comment: 'Paste icon tooltip'},
      'PasswordValidation': {id: 'PasswordValidation', value: '<strong>A senha deve:</strong><br>conter pelo menos 10 caracteres<br>conter pelo menos um caractere maiúsculo<br>conter pelo menos um caractere minúsculo<br>conter um caractere especial<br>não conter o seu nome de usuário<br>não pode ser uma senha que tenha sido usada<br>', comment: 'Password validation requirements'},
      'PasswordConfirmValidation': {id: 'PasswordConfirmValidation', value: 'A senha deve ser igual', comment: 'Password Confirm validation'},
      'Peak': {id: 'Peak', value: 'Máximo', comment: 'the max or peak value in a chart'},
      'PersonalizeColumns': {id: 'PersonalizeColumns', value: 'Personalizar colunas', comment: 'Customize Columns in a Grid'},
      'Period': {id: 'Period', value: 'Período', comment: 'the am/pm portion of a time'},
      'PressDown': {id: 'PressDown', value: 'Pressione a seta para baixo para selecionar uma data', comment: 'the audible label for Tooltip about how to operate the date picker'},
      'PressShiftF10': {id: 'PressShiftF10', value: 'Pressione Shift+F10 para abrir o menu de contexto.', comment: 'the audible infor for screen readers on how to use a field with a popup menu'},
      'Previous': {id: 'Previous', value: 'Anterior', comment: 'Previous icon tooltip - moved to previous record'},
      'PreviousMonth': {id: 'PreviousMonth', value: 'Mês anterior', comment: 'the label for the button that moves calendar to next/prev'},
      'PreviousPage': {id: 'PreviousPage', value: 'Página anterior', comment: 'Previous Page tooltip'},
      'Print': {id: 'Print', value: 'Imprimir', comment: 'Print tooltip'},
      'Range': {id: 'Range', value: 'Intervalo', comment: 'Range for tooltip'},
      'RecordsPerPage': {id: 'RecordsPerPage', value: '{0} registros por página', comment: 'Dropd own allows the user to select how many visible records {} shows select value.'},
      'Redo': {id: 'Redo', value: 'Refazer', comment: 'Redo tooltip'},
      'Refresh': {id: 'Refresh', value: 'Atualizar', comment: 'Refresh tooltip'},
      'Required': {id: 'Required', value: 'Obrigatório', comment: 'indicates a form field is manditory'},
      'Reset': {id: 'Reset', value: 'Redefinir', comment: 'Reset tooltip'},
      'Results': {id: 'Results', value: 'Resultados', comment: 'As in showing N Results in a List'},
      'RightAlign': {id: 'RightAlign', value: 'Alinhar à direita', comment: 'Right Align tooltip'},
      'RightAlignText': {id: 'RightAlignText', value: 'Alinhar à direita', comment: 'Right Align Text tooltip'},
      'Right': {id: 'Right', value: 'Direita', comment: 'Right'},
      'Roles': {id: 'Roles', value: 'Funções', comment: 'Roles tooltip'},
      'RowHeight': {id: 'RowHeight', value: 'Altura da linha', comment: 'Describes the Height for Rows in a Data Grid'},
      'Ruby': {id: 'Ruby', value: 'Rubi', comment: 'Color in our color pallette'},
      'RunFilter': {id: 'RunFilter', value: 'Executar filtro', comment: 'Execute the current filter criteria'},
      'Save': {id: 'Save', value: 'Salvar', comment: 'Save tooltip'},
      'SaveCurrentView': {id: 'SaveCurrentView', value: 'Salvar visualização atual', comment: 'Datagrids contain view sets. This menu option saves them'},
      'SavedViews': {id: 'SavedViews', value: 'Visualizações salvas', comment: 'Label for a list of Views'},
      'Search': {id: 'Search', value: 'Pesquisar', comment: 'Search tooltip'},
      'SearchColumnName': {id: 'SearchColumnName', value: 'Pesquisar nome de coluna', comment: 'Search for a datagrid column by name'},
      'SearchFolder': {id: 'SearchFolder', value: 'Pesquisar pasta', comment: 'Search Folder tooltip'},
      'SearchList': {id: 'SearchList', value: 'Pesquisar lista', comment: 'Search List tooltip'},
      'Select': {id: 'Select', value: 'Selecionar', comment: 'text describing a select action'},
      'Selected': {id: 'Selected', value: 'Selecionado', comment: 'text describing a selected object'},
      'Send': {id: 'Send', value: 'Enviar', comment: 'Send tooltip'},
      'SetTime': {id: 'SetTime', value: 'Definir hora', comment: 'button text that inserts time when clicked'},
      'Settings': {id: 'Settings', value: 'Configurações', comment: 'Settings tooltip'},
      'Short': {id: 'Short', value: 'Reduzido', comment: 'Describes a Shorted Row Height in a grid/list'},
      'ShowFilterRow': {id: 'ShowFilterRow', value: 'Mostrar linha de filtro', comment: 'Toggle a row with filer info above a list'},
      'ShowLess': {id: 'ShowLess', value: 'Mostrar menos', comment: 'Show less form content'},
      'ShowMore': {id: 'ShowMore', value: 'Mostrar mais', comment: 'Show more form content'},
      'Slate': {id: 'Slate', value: 'Quadro-negro', comment: 'Color in our color pallette'},
      'SliderHandle': {id: 'SliderHandle', value: 'Alça para', comment: 'Description of the portion of a Slider control that is focusable and changes its value, followed in code by the name of the control'},
      'SliderMaximumHandle': {id: 'SliderMaximumHandle', value: 'Alça de intervalo máximo para', comment: 'Describes a maximum value handle in a Range (double slider), followed in code by the name of the control'},
      'SliderMinimumHandle': {id: 'SliderMinimumHandle', value: 'Alça de intervalo mínimo para', comment: 'Describes a minimum value handle in a Range (double slider), followed in code by the name of the control'},
      'SkipToMain': {id: 'SkipToMain', value: 'Pular para conteúdo principal', comment: 'Skip link in header, jumps when clicked on to main area'},
      'StartWith': {id: 'StartWith', value: 'Começa com', comment: 'for condition filtering'},
      'StrikeThrough': {id: 'StrikeThrough', value: 'Tachado', comment: 'turn on and off strike through text in text editor (like word)'},
      'SortAtoZ': {id: 'SortAtoZ', value: 'Classificação ascendente', comment: 'Sort A to Z in icons for filtering'},
      'SortZtoA': {id: 'SortZtoA', value: 'Classificação descendente', comment: 'Sort Z to A in icons for filtering'},
      'SortDown': {id: 'SortDown', value: 'Classificar para baixo', comment: 'Sort Down tooltip'},
      'SortUp': {id: 'SortUp', value: 'Classificar para cima', comment: 'Sort Up tooltip'},
      'Subscript': {id: 'Subscript', value: 'Subscrito', comment: 'Turn on and off Subscript text in text editor (like word)'},
      'Superscript': {id: 'Superscript', value: 'Sobrescrito', comment: 'Turn on and off Superscript text in text editor (like word)'},
      'Tabs': {id: 'Tabs', value: 'Guias...', comment: 'Used in the Tabs Control\'s more menu, preceeded by a number that describes how many tabs are in the spillover menu'},
      'Tack': {id: 'Tack', value: 'Marcar', comment: 'Pin an object'},
      'Tall': {id: 'Tall', value: 'Aumentado', comment: 'Describes a Taller Row Height in a grid/list'},
      'Timer': {id: 'Timer', value: 'Temporizador', comment: 'Timer tooltip'},
      'Today': {id: 'Today', value: 'Hoje', comment: 'refering to today on a calendar'},
      'ToggleBold': {id: 'ToggleBold', value: 'Alternar texto em negrito', comment: 'turn on and off bold in text editor (like word)'},
      'ToggleH3': {id: 'ToggleH3', value: 'Alternar cabeçalho 3', comment: 'turn on and off heading 3 text'},
      'ToggleH4': {id: 'ToggleH4', value: 'Alternar cabeçalho 4', comment: 'turn on and off heading 4 text'},
      'ToggleItalic': {id: 'ToggleItalic', value: 'Alternar texto em itálico', comment: 'turn on and off Italic in text editor (like word)'},
      'ToggleUnderline': {id: 'ToggleUnderline', value: 'Alternar texto sublinhado', comment: 'turn on and off Underline in text editor (like word)'},
      'Toolbar': {id: 'Toolbar', value: 'Barra de ferramentas', comment: 'describing the toolbar component'},
      'TopAlign': {id: 'TopAlign', value: 'Alinhar acima', comment: 'Top Align tooltip'},
      'Total': {id: 'Total', value: 'Total', comment: 'Mathematic total of a calculation'},
      'TreeCollapse': {id: 'TreeCollapse', value: 'Recolher árvore', comment: 'Tree Collapse tooltip'},
      'TreeExpand': {id: 'TreeExpand', value: 'Expandir árvore', comment: 'Tree Expand tooltip'},
      'Turquoise': {id: 'Turquoise', value: 'Turquesa', comment: 'Color in our color pallette'},
      'Up': {id: 'Up', value: 'Para cima', comment: 'Up tooltip'},
      'Upload': {id: 'Upload', value: 'Carregar', comment: 'Upload tooltip'},
      'UnavailableDate': {id: 'UnavailableDate', value: 'Data indisponível', comment: 'Unavailable Date Text'},
      'Underline': {id: 'Underline', value: 'Sublinhar', comment: 'Make text Underlined'},
      'Undo': {id: 'Undo', value: 'Desfazer', comment: 'Undo tooltip'},
      'Unlocked': {id: 'Unlocked', value: 'Desbloqueado', comment: 'Unlocked tooltip'},
      'UnorderedList': {id: 'UnorderedList', value: 'Inserir/remover lista com marcadores', comment: 'Insert an Unordered list in the editor'},
      'Unsupported': {id: 'Unsupported', value: 'Este conteúdo não está disponível porque usa recursos não suportados na sua versão de navegador atual.', comment: 'Suggesting browser upgrade for missing features.'},
      'Url': {id: 'Url', value: 'Url', comment: 'Url tooltip'},
      'UseArrow': {id: 'UseArrow', value: '. Use as teclas de seta para selecionar.', comment: 'Instructional comments for screen readers'},
      'UseEnter': {id: 'UseEnter', value: '. Use Enter ou pressione a seta para baixo para buscar.', comment: 'Instructional comments for screen readers'},
      'User': {id: 'User', value: 'Usuário', comment: 'User tooltip'},
      'UserProfile': {id: 'UserProfile', value: 'Perfil de usuário', comment: 'User Profile tooltip'},
      'VerticalMiddleAlign': {id: 'VerticalMiddleAlign', value: 'Alinhar verticalmente ao centro', comment: 'Vertical Align tooltip'},
      'ViewSource': {id: 'ViewSource', value: 'Visualizar origem', comment: 'Toggle the source view in the editor'},
      'ViewVisual': {id: 'ViewVisual', value: 'Visualizar resultado visual', comment: 'Toggle the visual view in the editor'},
      'Yes': {id: 'Yes', value: 'Sim', comment: 'On a dialog button'}
    }
  });
}));
