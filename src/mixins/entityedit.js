export default {
  data() {
    return {
      entityLoaded: false,
      editMode: false,
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    viewMode() {
      return !!this.$route.query?.view
    },
    loaded() {
      return !this.id || this.id == 0 || this.entityLoaded
    },
    allFormFields() {
      if (this.sections?.length) {
        return [].concat(...this.sections.map(({ fields }) => fields || []))
      }

      return this.formFields || []
    },
    docFields() {
      return this.allFormFields
        .filter(field => field.type === 'file')
        .map(f => f.id)
    },
  },
  mounted() {
    this.editMode = !this.viewMode
  },
  methods: {
    proceedStep() {
      this.tabIndex++
    },
    updateTabIndex(newVal) {
      this.$emit('tabIndexUpdated', newVal)
    },
    setTabIndex(newVal) {
      this.tabIndex = newVal
    },
    entityFetched(entity) {
      this.entityLoaded = true
      this.$emit('entityUpdated', entity)
      this.$emit('entityFetched', entity)
    },
    editLoaded(entity) {
      this.entityLoaded = true
      this.setEntity(entity)
    },
    entitySaved(entity) {
      this.$emit('entitySaved', entity)
    },
    setEntity(entity) {
      this.entity = {
        ...this.entity,
        ...entity,
      }
    },
    editModeSet(mode) {
      this.editMode = mode
      this.$emit('editModeSet', mode)
    },
    setParentField() {
      if (
        this.id == 0 &&
        this.$route.query.parent &&
        this.$route.query.parentid
      ) {
        this.entity[this.$route.query.parent] = this.allFormFields
          .find(field => field.id === this.$route.query.parent)
          .options.find(
            option => option.id === parseInt(this.$route.query.parentid),
          )
      }
    },
    docsDataTransformation(entity) {
      if (entity.uploads) {
        for (const [key, value] of Object.entries(entity.uploads)) {
          entity[key] = value
        }
      }

      return entity
    },
    docsEditTransformation(entity) {
      entity.uploads = {}
      this.docFields.forEach(docField => {
        entity.uploads[docField] = entity[docField]
        if (entity[docField]) {
          entity[docField] = [new File([entity[docField]], entity[docField].title)]
        }
      })

      return entity
    },
    updateEntityProp(fieldObj) {
      const entity = this.entity
      if (fieldObj.parent) {
        entity[fieldObj.parent][fieldObj.id] = fieldObj.value
      } else {
        entity[fieldObj.id] = fieldObj.value
      }

      this.$emit('propUpdated', fieldObj)
      this.$emit('entityUpdated', entity)
      if (this.afterPropUpdate) {
        this.afterPropUpdate(fieldObj.id)
      }
    },
  },
}
