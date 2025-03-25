export default {
  editor: {
    label: {
      en: 'Weekly Schedule',
      pt: 'Agenda Semanal',
    },
    icon: 'mdi-calendar-week',
  },
  properties: {
    // Conteúdo básico
    title: {
      label: {
        en: 'Title',
        pt: 'Título',
      },
      type: 'Text',
      defaultValue: 'Agenda Semanal',
      bindable: true,
    },
    showTitle: {
      label: {
        en: 'Show Title',
        pt: 'Mostrar Título',
      },
      type: 'OnOff',
      defaultValue: true,
      bindable: true,
    },

    // Configurações de horas
    weeklyHoursGoal: {
      label: {
        en: 'Weekly Hours Goal',
        pt: 'Meta de Horas Semanais',
      },
      type: 'Number',
      options: {
        min: 0,
        max: 168,
      },
      defaultValue: 20,
      bindable: true,
    },
    hoursGoalLabel: {
      label: {
        en: 'Hours Goal Label',
        pt: 'Rótulo da Meta de Horas',
      },
      type: 'Text',
      defaultValue: 'Meta de horas de estudo:',
      bindable: true,
    },

    // Configurações de alerta
    warningMessage: {
      label: {
        en: 'Goal Reached Warning',
        pt: 'Aviso de Meta Atingida',
      },
      type: 'Text',
      defaultValue: 'Você atingiu sua meta de horas de estudo para a semana!',
      bindable: true,
    },

    // Visualização
    showProgressBar: {
      label: {
        en: 'Show Progress Bar',
        pt: 'Mostrar Barra de Progresso',
      },
      type: 'OnOff',
      defaultValue: true,
      bindable: true,
    },
    showLegend: {
      label: {
        en: 'Show Legend',
        pt: 'Mostrar Legenda',
      },
      type: 'OnOff',
      defaultValue: true,
      bindable: true,
    },
    showHoursStatus: {
      label: {
        en: 'Show Hours Status',
        pt: 'Mostrar Status de Horas',
      },
      type: 'OnOff',
      defaultValue: true,
      bindable: true,
    },
    forceDesktopView: {
      label: {
        en: 'Force Desktop View',
        pt: 'Forçar Visualização Desktop',
      },
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
    },
    mobileBreakpoint: {
      label: {
        en: 'Mobile Breakpoint (px)',
        pt: 'Breakpoint Mobile (px)',
      },
      type: 'Number',
      defaultValue: 768,
      bindable: true,
    },

    // Horários visíveis
    startHour: {
      label: {
        en: 'Start Hour',
        pt: 'Hora Inicial',
      },
      type: 'Number',
      options: {
        min: 0,
        max: 23,
      },
      defaultValue: 6,
      bindable: true,
    },
    endHour: {
      label: {
        en: 'End Hour',
        pt: 'Hora Final',
      },
      type: 'Number',
      options: {
        min: 0,
        max: 23,
      },
      defaultValue: 22,
      bindable: true,
    },

    // Dados iniciais (configuráveis via JSON)
    initialData: {
      label: {
        en: 'Initial Schedule Data (JSON)',
        pt: 'Dados Iniciais da Agenda (JSON)',
      },
      type: 'Text',
      defaultValue: '{}',
      hidden: true,
      bindable: true,
    },

    // Arrays de configuração
    scheduleTypes: {
      hidden: true,
      defaultValue: [
        {
          value: 'study',
          label: 'Estudo',
          color: '#4CAF50',
          textColor: '#FFFFFF',
          legend: 'Disponível para estudo',
        },
        {
          value: 'class',
          label: 'Aula',
          color: '#F44336',
          textColor: '#FFFFFF',
          legend: 'Compromisso (aula, estágio, etc.)',
        },
        {
          value: 'leisure',
          label: 'Lazer',
          color: '#2196F3',
          textColor: '#FFFFFF',
          legend: 'Lazer/Descanso',
        },
        {
          value: 'work',
          label: 'Trabalho',
          color: '#FF9800',
          textColor: '#FFFFFF',
          legend: 'Trabalho',
        },
      ],
      bindable: true,
    },
    days: {
      hidden: true,
      defaultValue: [
        { value: 'sunday', label: 'Domingo', shortLabel: 'Dom' },
        { value: 'monday', label: 'Segunda', shortLabel: 'Seg' },
        { value: 'tuesday', label: 'Terça', shortLabel: 'Ter' },
        { value: 'wednesday', label: 'Quarta', shortLabel: 'Qua' },
        { value: 'thursday', label: 'Quinta', shortLabel: 'Qui' },
        { value: 'friday', label: 'Sexta', shortLabel: 'Sex' },
        { value: 'saturday', label: 'Sábado', shortLabel: 'Sáb' },
      ],
      bindable: true,
    },

    // Estilos principais
    fontFamily: {
      label: {
        en: 'Font Family',
        pt: 'Família de Fontes',
      },
      type: 'FontFamily',
      defaultValue: 'Inter, system-ui, sans-serif',
      bindable: true,
    },
    textColor: {
      label: {
        en: 'Text Color',
        pt: 'Cor do Texto',
      },
      type: 'Color',
      defaultValue: '#333333',
      bindable: true,
    },
    backgroundColor: {
      label: {
        en: 'Background Color',
        pt: 'Cor de Fundo',
      },
      type: 'Color',
      defaultValue: '#FFFFFF',
      bindable: true,
    },
    borderRadius: {
      label: {
        en: 'Border Radius',
        pt: 'Raio da Borda',
      },
      type: 'Length',
      defaultValue: '16px',
      bindable: true,
    },

    // Opções de borda e sombra
    showShadow: {
      label: {
        en: 'Show Shadow',
        pt: 'Mostrar Sombra',
      },
      type: 'OnOff',
      defaultValue: true,
      bindable: true,
    },
    shadowStyle: {
      label: {
        en: 'Shadow Style',
        pt: 'Estilo da Sombra',
      },
      type: 'Text',
      defaultValue: '0 8px 30px rgba(0,0,0,0.12)',
      bindable: true,
    },
    showBorder: {
      label: {
        en: 'Show Border',
        pt: 'Mostrar Borda',
      },
      type: 'OnOff',
      defaultValue: true,
      bindable: true,
    },
    borderColor: {
      label: {
        en: 'Border Color',
        pt: 'Cor da Borda',
      },
      type: 'Color',
      defaultValue: '#eaeaea',
      bindable: true,
    },

    // Estilos específicos
    titleColor: {
      label: {
        en: 'Title Color',
        pt: 'Cor do Título',
      },
      type: 'Color',
      defaultValue: '#333333',
      bindable: true,
    },
    titleSize: {
      label: {
        en: 'Title Size',
        pt: 'Tamanho do Título',
      },
      type: 'Length',
      defaultValue: '1.4rem',
      bindable: true,
    },
    secondaryTextColor: {
      label: {
        en: 'Secondary Text Color',
        pt: 'Cor de Texto Secundária',
      },
      type: 'Color',
      defaultValue: '#666666',
      bindable: true,
    },

    // Cores e estilos da barra de progresso
    progressBarBgColor: {
      label: {
        en: 'Progress Bar Background',
        pt: 'Fundo da Barra de Progresso',
      },
      type: 'Color',
      defaultValue: '#e6e6e6',
      bindable: true,
    },
    progressBarColor: {
      label: {
        en: 'Progress Bar Color',
        pt: 'Cor da Barra de Progresso',
      },
      type: 'Color',
      defaultValue: '#4CAF50',
      bindable: true,
    },
    progressBarLowColor: {
      label: {
        en: 'Progress Bar Low Color',
        pt: 'Cor Baixa da Barra de Progresso',
      },
      type: 'Color',
      defaultValue: '#FFC107',
      bindable: true,
    },
    progressBarVeryLowColor: {
      label: {
        en: 'Progress Bar Very Low Color',
        pt: 'Cor Muito Baixa da Barra de Progresso',
      },
      type: 'Color',
      defaultValue: '#F44336',
      bindable: true,
    },

    // Grades e células
    dividerColor: {
      label: {
        en: 'Divider Color',
        pt: 'Cor do Divisor',
      },
      type: 'Color',
      defaultValue: '#eaeaea',
      bindable: true,
    },
    gridLineColor: {
      label: {
        en: 'Grid Line Color',
        pt: 'Cor da Linha da Grade',
      },
      type: 'Color',
      defaultValue: '#eaeaea',
      bindable: true,
    },
    cellHeight: {
      label: {
        en: 'Cell Height',
        pt: 'Altura da Célula',
      },
      type: 'Length',
      defaultValue: '52px',
      bindable: true,
    },
    mobileCellHeight: {
      label: {
        en: 'Mobile Cell Height',
        pt: 'Altura da Célula Mobile',
      },
      type: 'Length',
      defaultValue: '60px',
      bindable: true,
    },
    emptyCellColor: {
      label: {
        en: 'Empty Cell Color',
        pt: 'Cor da Célula Vazia',
      },
      type: 'Color',
      defaultValue: '#ffffff',
      bindable: true,
    },

    // Cabeçalhos e rótulos
    headerBgColor: {
      label: {
        en: 'Header Background',
        pt: 'Fundo do Cabeçalho',
      },
      type: 'Color',
      defaultValue: '#FFFFFF',
      bindable: true,
    },
    dayHeaderBgColor: {
      label: {
        en: 'Day Header Background',
        pt: 'Fundo do Cabeçalho de Dia',
      },
      type: 'Color',
      defaultValue: '#f8f9fa',
      bindable: true,
    },
    cornerCellColor: {
      label: {
        en: 'Corner Cell Color',
        pt: 'Cor da Célula de Canto',
      },
      type: 'Color',
      defaultValue: '#f8f9fa',
      bindable: true,
    },
    timeLabelColor: {
      label: {
        en: 'Time Label Color',
        pt: 'Cor do Rótulo de Hora',
      },
      type: 'Color',
      defaultValue: '#666666',
      bindable: true,
    },
    timeLabelBgColor: {
      label: {
        en: 'Time Label Background',
        pt: 'Fundo do Rótulo de Hora',
      },
      type: 'Color',
      defaultValue: '#f8f9fa',
      bindable: true,
    },

    // Estilos Mobile
    daySelectorBgColor: {
      label: {
        en: 'Day Selector Background',
        pt: 'Fundo do Seletor de Dia',
      },
      type: 'Color',
      defaultValue: '#f8f9fa',
      bindable: true,
    },
    activeDayBgColor: {
      label: {
        en: 'Active Day Background',
        pt: 'Fundo do Dia Ativo',
      },
      type: 'Color',
      defaultValue: '#2196F3',
      bindable: true,
    },
    activeDayTextColor: {
      label: {
        en: 'Active Day Text Color',
        pt: 'Cor do Texto do Dia Ativo',
      },
      type: 'Color',
      defaultValue: '#ffffff',
      bindable: true,
    },
    inactiveDayColor: {
      label: {
        en: 'Inactive Day Color',
        pt: 'Cor do Dia Inativo',
      },
      type: 'Color',
      defaultValue: '#555555',
      bindable: true,
    },

    // Mensagem de aviso
    warningBgColor: {
      label: {
        en: 'Warning Background',
        pt: 'Fundo do Aviso',
      },
      type: 'Color',
      defaultValue: '#FFF3CD',
      bindable: true,
    },
    warningTextColor: {
      label: {
        en: 'Warning Text Color',
        pt: 'Cor do Texto de Aviso',
      },
      type: 'Color',
      defaultValue: '#856404',
      bindable: true,
    },
    warningBorderColor: {
      label: {
        en: 'Warning Border Color',
        pt: 'Cor da Borda de Aviso',
      },
      type: 'Color',
      defaultValue: '#FFEEBA',
      bindable: true,
    },

    // Legenda e status
    legendBgColor: {
      label: {
        en: 'Legend Background',
        pt: 'Fundo da Legenda',
      },
      type: 'Color',
      defaultValue: '#f8f9fa',
      bindable: true,
    },
    legendTextColor: {
      label: {
        en: 'Legend Text Color',
        pt: 'Cor do Texto da Legenda',
      },
      type: 'Color',
      defaultValue: '#666666',
      bindable: true,
    },
    legendColorRadius: {
      label: {
        en: 'Legend Color Radius',
        pt: 'Raio da Cor da Legenda',
      },
      type: 'Length',
      defaultValue: '4px',
      bindable: true,
    },
    statusBgColor: {
      label: {
        en: 'Status Background',
        pt: 'Fundo do Status',
      },
      type: 'Color',
      defaultValue: '#ffffff',
      bindable: true,
    },
    statusItemBgColor: {
      label: {
        en: 'Status Item Background',
        pt: 'Fundo do Item de Status',
      },
      type: 'Color',
      defaultValue: '#f8f8f8',
      bindable: true,
    },
    statusLabelColor: {
      label: {
        en: 'Status Label Color',
        pt: 'Cor do Rótulo de Status',
      },
      type: 'Color',
      defaultValue: '#444444',
      bindable: true,
    },
    statusHoursColor: {
      label: {
        en: 'Status Hours Color',
        pt: 'Cor das Horas de Status',
      },
      type: 'Color',
      defaultValue: '#333333',
      bindable: true,
    },

    // Elementos de entrada e botões
    buttonBgColor: {
      label: {
        en: 'Button Background',
        pt: 'Fundo do Botão',
      },
      type: 'Color',
      defaultValue: '#f5f5f5',
      bindable: true,
    },
    buttonTextColor: {
      label: {
        en: 'Button Text Color',
        pt: 'Cor do Texto do Botão',
      },
      type: 'Color',
      defaultValue: '#555555',
      bindable: true,
    },
    inputBorderColor: {
      label: {
        en: 'Input Border Color',
        pt: 'Cor da Borda de Entrada',
      },
      type: 'Color',
      defaultValue: '#dddddd',
      bindable: true,
    },
  },
  classes: {
    sections: ['weekly-schedule'],
    panels: [
      {
        label: { en: 'General', pt: 'Geral' },
        options: [
          'title',
          'showTitle',
          'weeklyHoursGoal',
          'hoursGoalLabel',
          'warningMessage',
        ],
      },
      {
        label: { en: 'Display', pt: 'Exibição' },
        options: [
          'showProgressBar',
          'showLegend',
          'showHoursStatus',
          'forceDesktopView',
          'startHour',
          'endHour',
        ],
      },
      {
        label: { en: 'Style', pt: 'Estilo' },
        options: [
          'fontFamily',
          'textColor',
          'backgroundColor',
          'borderRadius',
          'showShadow',
          'shadowStyle',
          'showBorder',
          'borderColor',
        ],
      },
      {
        label: { en: 'Colors', pt: 'Cores' },
        options: [
          'titleColor',
          'titleSize',
          'secondaryTextColor',
          'progressBarBgColor',
          'progressBarColor',
          'dividerColor',
          'gridLineColor',
        ],
      },
    ],
  },
  interactions: [
    {
      name: 'scheduleChanged',
      label: { en: 'On Schedule Changed', pt: 'Ao Alterar a Agenda' },
      event: {
        data: {
          type: 'Object',
          description: {
            en: 'Full schedule data structure',
            pt: 'Estrutura completa de dados da agenda',
          },
        },
        filledCells: {
          type: 'Array',
          description: {
            en: 'Array with all filled cells (day-hour-type)',
            pt: 'Array com todas as células preenchidas (dia-hora-tipo)',
          },
        },
        filledHours: {
          type: 'Object',
          description: {
            en: 'Count of hours by activity type',
            pt: 'Contagem de horas por tipo de atividade',
          },
        },
        studyHours: {
          type: 'Number',
          description: {
            en: 'Total study hours',
            pt: 'Total de horas de estudo',
          },
        },
        weeklyHoursGoal: {
          type: 'Number',
          description: {
            en: 'Weekly hours goal',
            pt: 'Meta de horas semanais',
          },
        },
        weeklyProgressPercentage: {
          type: 'Number',
          description: {
            en: 'Percentage of weekly goal completion',
            pt: 'Porcentagem de conclusão da meta semanal',
          },
        },
      },
    },
  ],
  actions: [
    {
      name: 'clearSchedule',
      label: { en: 'Clear Schedule', pt: 'Limpar Agenda' },
    },
    {
      name: 'setCellValue',
      label: { en: 'Set Cell Value', pt: 'Definir Valor da Célula' },
      parameters: [
        {
          name: 'day',
          type: 'String',
          options: [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
          ],
        },
        {
          name: 'hour',
          type: 'Number',
          options: { min: 0, max: 23 },
        },
        {
          name: 'type',
          type: 'String',
          options: ['study', 'class', 'leisure', 'work', ''],
        },
      ],
    },
    {
      name: 'setWeeklyHoursGoal',
      label: {
        en: 'Set Weekly Hours Goal',
        pt: 'Definir Meta de Horas Semanais',
      },
      parameters: [
        {
          name: 'goal',
          type: 'Number',
          options: { min: 0, max: 168 },
        },
      ],
    },
    {
      name: 'importSchedule',
      label: { en: 'Import Schedule Data', pt: 'Importar Dados da Agenda' },
      parameters: [
        {
          name: 'data',
          type: 'Object',
        },
      ],
    },
  ],
  getters: [
    {
      name: 'getScheduleData',
      label: { en: 'Get Schedule Data', pt: 'Obter Dados da Agenda' },
      return: {
        type: 'Object',
        properties: {
          data: { type: 'Object' },
          filledCells: { type: 'Array' },
          filledHours: { type: 'Object' },
          studyHours: { type: 'Number' },
          weeklyHoursGoal: { type: 'Number' },
          weeklyProgressPercentage: { type: 'Number' },
        },
      },
    },
  ],
};
