export default {
  computed: {
    config() {
      return {
        endpoint: 'organizations',
        route: 'organizations',
        title: {
          single: this.$t('Organization'),
          plural: this.$t('Organizations'),
          geniki: this.$t('Organization(gen)'),
        },
      }
    },
    configUploadTurnover() {
      return { ...this.config, ...{ endpoint: 'organizations/turnovers' } }
    },
    colSize() {
      return this.singleEdit ? 4 : 12
    },
    coreFields() {
      return [
        {
          id: 'id',
          type: 'number',
          label: this.$t('Organization Code'),
          required: true,
          colSize: this.colSize,
          hidden: this.editMode,
        },
        {
          id: 'market',
          type: 'select',
          label: this.$t('Market'),
          options: this.marketOptions,
          required: true,
          colSize: this.colSize,
        },
        {
          id: 'afm',
          type: 'text',
          label: this.$t('Organization Vat'),
          rules: ['grvat'],
          required: true,
          colSize: this.colSize,
        },
        {
          id: 'email',
          type: 'text',
          label: this.$t('Email'),
          rules: ['email'],
          required: true,
          colSize: this.colSize,
        },
        {
          id: 'title',
          type: 'text',
          label: this.$t('Organization Distinctive Title'),
          required: true,
          colSize: this.colSize,
        },
        {
          id: 'description',
          type: 'text',
          label: this.$t('Organization Name'),
          required: true,
          colSize: this.colSize,
        },
        {
          id: 'eregistryId',
          type: 'text',
          label: this.$t('eregistryId'),
          required: true,
          colSize: this.colSize,
        },
        {
          id: 'eregistryRegistrationNumber',
          type: 'text',
          label: this.$t('eregistryRegistrationNumber'),
          required: true,
          colSize: this.colSize,
        },
      ]
    },

    filters() {
      const filteredFields = this.coreFields.filter(field => field.id !== 'turnover')
        .map(field => {
          return { ...field, colSize: 4 }
        })
    
      const statusFilter = {
        id: 'enabled',
        type: 'select',
        label: this.$t('Organization Status'),
        options: this.statusOptions,
        colSize: 4,
      }
    
      return [...filteredFields, statusFilter]
    },
    
    formFields() {
      return [
        ...this.coreFields,
        ...[
          {
            id: 'enabled',
            type: 'checkbox',
            label: this.$t('Status'),
            optionLabel: this.$t('enabled'),
            colSize: this.colSize,
          },
        ],
      ]
    },
  },
}
