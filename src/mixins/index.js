import el from 'moment/dist/locale/el'
import moment from 'moment/dist/moment'
// import ToastificationContent from '../components/toastification/ToastificationContent.vue'

moment.updateLocale('el', { ...el, ...{ invalidDate: '' } })

export default {
  computed: {
    appUrl() {
      return import.meta.env.VITE_APP_URL
    },
    apiUrl() {
      return import.meta.env.VITE_API_URL
    },
    localAppVersion() {
      return '1.2.0'
    },
    marketOptions() {
      const allMarkets = [
        { id: 'TELECOMMUNICATION', title: 'Τηλεπικοινωνιακές Υπηρεσίες' },
        { id: 'POSTAL', title: 'Υπηρεσίες Ταχυδρομείων' },
      ]

      return allMarkets.filter(
        item => this.user.market == null || item.id === this.user.market,
      )
    },
    statusOptions() {
      return [
        { id: 0, title: 'Ανενεργός' },
        { id: 1, title: 'Ενεργός' },
      ]
    },
    questionnaireStatusOptions() {
      return [
        { id: 'INACTIVE', title: 'Ανενεργό' },
        { id: 'ACTIVE', title: 'Ενεργό' },
        { id: 'IN_PROCESSING', title: 'Σε επεξεργασία' },
      ]
    },
    yearOptions() {
      const yearCount = 10
      const startYear = new Date().getFullYear() - yearCount + 1

      return Array.from({ length: yearCount }, (_, index) => ({
        id: startYear + index,
        title: startYear + index,
      })).reverse()
    },
    submissionPeriodOptions() {
      return [
        {
          id: 'ANNUAL',
          title: 'Ετησίως',
        },
        {
          id: 'SEMIANNUAL',
          title: 'Εξαμηνιαία',
        },
        {
          id: 'QUARTER',
          title: 'Τριμηνιαία',
        },
      ]
    },
    yesNoOptions() {
      return [
        {
          id: true,
          title: 'Ναι',
        },
        {
          id: false,
          title: 'Όχι',
        },
      ]
    },
    user() {
      return this.$store.userData
    },

  },
  methods: {
    isoDateOnlyTrimmed(time) {
      return moment(time).format('YYYY-MM-DD')
    },
    isoDateTrimmed(time) {
      return moment(time).format('YYYY-MM-DDTHH:mm')
    },
    isoDate(time) {
      return this.momentFormatIso(moment(time))
    },
    momentFormatIso(mDate) {
      return mDate.format('YYYY-MM-DDTHH:mm:ss')
    },
    longDate(time) {
      return moment(time).format('dddd, D MMMM YYYY HH:mm')
    },
    mediumDate(time) {
      return moment(time).format('DD/MM/YYYY HH:mm')
    },
    dateOnly(time) {
      if (time) {
        return moment(time).format('DD/MM/YYYY')
      }

      return '-'
    },
    shortDate(time) {
      return moment(time).format('DD/MM')
    },
    midDate(time) {
      return moment(time).format('DD MMMM YY')
    },
    monthDate(time) {
      return moment(time).format('MMMM YYYY')
    },
    shortTime(time) {
      return moment(time).format('HH:mm')
    },
    addHours(hours) {
      return moment(new Date())
        .add(hours, 'hour')
        .format(import.meta.env.VITE_DATETIME_FORMAT)
    },
    addHoursIso(hours) {
      return this.momentFormatIso(moment(new Date()).add(hours, 'hour'))
    },
    addDaysIso(days) {
      return moment(new Date()).add(days, 'day').format('YYYY-MM-DD')
    },
    getTitle(item) {
      return item?.title || '-'
    },
    getParsedKey(item, key) {
      const keys = key.split('.')
      if (keys.length === 3) {
        return item[keys[0]] && item[keys[0]][keys[1]]
          ? item[keys[0]][keys[1]][keys[2]]
          : '-'
      }

      return item[keys[0]] ? item[keys[0]][keys[1]] : '-'
    },
    translate(value, prefix = '') {
      return this.$t(prefix + value)
    },
    translateList(arr) {
      return arr.map(item => ({ key: item, title: this.$t(item) }))
    },
    listTitles(arr) {
      return arr?.map(item => item.title ?? item).join(', ')
    },
    booleanTitle(value) {
      const title = value ? 'enabled' : 'disabled'

      return this.$t(title)
    },
    yesNoTitle(value) {
      const title = value ? 'Yes' : 'No'

      return this.$t(title)
    },
    renderUrl(value) {
      return `<a href="${value}" target="_blank">${value}</a>`
    },
    renderFileUrl(file) {
      if (!file) {
        return ''
      }

      return `<a href="javascript:void(0)">${file.title}</a>`
    },
    async downloadFile(item) {
      const file = item.file ?? item
      const fileObj = await this.$store.fetchFile(file.id)

      const link = document.createElement('a')

      link.href = window.URL.createObjectURL(new Blob([fileObj.data]))
      link.setAttribute('download', file.title)
      document.body.appendChild(link)
      link.click()
      this.downloadingFile = false
    },
    entityTitle(entity, geniki, viewMode = false, editMode = true) {
      const prefix =
        viewMode && !editMode
          ? 'Προβολή'
          : entity.id > 0
            ? 'Επεξεργασία'
            : 'Εισαγωγή'

      return prefix + ' ' + geniki
    },
    modalTitle(entity, geniki, modalMode) {
      let prefix = ''

      switch (modalMode) {
      case 'view':
        prefix = 'Προβολή'
        break
      case 'create':
        prefix = 'Δημιουργία'
        break
      case 'edit':
        prefix = entity.id != null ? 'Επεξεργασία' : 'Εισαγωγή'
        break
      case 'duplicate':
        prefix = 'Δημιουργία αντιγράφου'
        break
      case '':
        break
      case null:
        break

      default:
        console.warn(`Unknown mode: ${modalMode}`)
      }

      return prefix + ' ' + geniki
    },
    formatPrice(value) {
      if (value >= 0) {
        return new Intl.NumberFormat('el-GR', {
          style: 'currency',
          currency: 'EUR',
        }).format(value)
      }

      return '-'
    },
    isToday(date) {
      const today = new Date()

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    },
    formatDate(
      value,
      formatting = { month: 'short', day: 'numeric', year: 'numeric' },
    ) {
      if (!value) return value

      return new Intl.DateTimeFormat(i18n.locale, formatting).format(
        new Date(value),
      )
    },
    // showToast(toastProps) {
    //   this.$toast({
    //     component: ToastificationContent,
    //     props: toastProps,
    //   })
    // },
    successToast(toastProps) {
      this.showToast({
        ...{ icon: 'fa-check', variant: 'success' },
        ...toastProps,
      })
    },
    errorToast(toastProps) {
      this.showToast({
        ...{ icon: 'fa-triangle-exclamation', variant: 'danger' },
        ...toastProps,
      })
    },
    shortenString(text, limit = 150) {
      const trimmedString = text.substr(0, limit)

      return trimmedString
        .substr(
          0,
          Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')),
        )
        .concat('...')
    },
    print() {
      window.print()
    },
    renderImg(src) {
      return `<img src="${src}" alt="" width="100"/>`
    },

    callFunc(methodName, param) {
      return this[methodName](param)
    },
    clearPrivateData() {
      sessionStorage.clear()
      localStorage.clear()
      this.$store.$reset()
    },
    logOutUrl(clientId) {
      return `${import.meta.env.VITE_AADE_LOGOUT_URL}${clientId}/?url=${
        this.apiUrl
      }`
    },
    logoutUser() {
      this.clearPrivateData()

      const logout = window.open(
        this.logOutUrl(
          this.user.type === 'OAUTH2_PA'
            ? import.meta.env.VITE_AADE_PA_CLIENTID
            : import.meta.env.VITE_AADE_CLIENTID,
        ),
        'oauth:taxis',
        'width=1,height=1,left=-1000,top=-1000',
      )

      setTimeout(function () {
        logout.close()
      }, 100)
      window.location = `${this.appUrl}login`
    },
    enumOptions(options) {
      return options.map(option => ({ id: option, title: this.$t(option) }))
    },
    async fetchDependentProp(
      id,
      options,
      endpoint,
      paramName = 'parent',
      callback = null,
    ) {
      if (this.entity[id]) {
        this.fetchGenericDependentProp(
          this.entity[id].id,
          options,
          endpoint,
          paramName,
          callback,
        )
      }
    },
    async fetchGenericDependentProp(
      val,
      options,
      endpoint,
      paramName = 'parent',
      callback = null,
    ) {
      this[options] = []
      if (val) {
        const params = {}

        params[paramName] = val
        this[options] = await this.$store.fetchCachedList(endpoint, params)
        if (callback) {
          callback()
        }
      }
    },
    refreshMarketQuestionnaires(target, val, options) {
      this.entity[target] = {
        market: val,
        title: '-',
      }
      this.fetchMarketQuestionnaires(val, options)
    },
    fetchMarketQuestionnaires(val, options) {
      this.fetchGenericDependentProp(val, options, 'questionnaires', 'market')
    },
  },
}
