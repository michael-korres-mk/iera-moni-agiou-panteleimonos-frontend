import moment from 'moment'

export default {
  computed: {
    rules() {
      return {
        required: value => !!value || 'Πρέπει να συμπληρώσετε το πεδίο.',
        filerequired: value =>
          !!value?.length || 'Πρέπει να συμπληρώσετε το πεδίο.',
        email: value =>
          !value ||
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value,
          ) ||
          'Παρακαλώ εισάγετε ένα έγκυρο e-mail.',
        phone: value =>
          !value ||
          /^([+0-9.]{3,5})?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
            value,
          ) ||
          'Παρακαλώ εισάγετε ένα έγκυρο τηλέφωνο.',
        url: value =>
          !value ||
          /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(
            value,
          ) ||
          'Παρακαλώ εισάγετε ένα έγκυρο URL.',
        password: value =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/.test(value) ||
          'Παρακαλώ εισάγετε ένα έγκυρο συνθηματικό.',
        filesize(value, limit) {
          return (
            !value?.length ||
            value[0].size < limit * 1000000 ||
            `Το μέγεθος του αρχείου πρέπει να είναι μικρότερο από ${limit} MB.`
          )
        },
        minvalue(value, limit) {
          return (
            !value ||
            value >= limit ||
            `Η τιμή που εισήχθηκε είναι μικρότερη από την ελάχιστη επιτρεπόμενη - ${limit}.`
          )
        },
        maxvalue(value, limit) {
          return (
            !value ||
            value <= limit ||
            `Η τιμή που εισήχθηκε είναι μεγαλύτερη από την μέγιστη επιτρεπόμενη - ${limit}.`
          )
        },
        pastDate: value =>
          !value ||
          moment(new Date()).isSameOrAfter(value) ||
          'Δεν επιτρέπεται μελλοντική ημερομηνία',
        positive: value =>
          !value || value > 0 || 'Δεν επιτρέπεται μικρότερος του 0',
        lat: value =>
          !value ||
          /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/.test(value) ||
          'Παρακαλώ εισάγετε ένα έγκυρο Γεωγραφικό πλάτος.',
        lng: value =>
          !value ||
          /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(value) ||
          'Παρακαλώ εισάγετε ένα έγκυρο Γεωγραφικό μήκος.',
        condition: (value, type) => {
          if(!value) return 'Πρέπει να συμπληρώσετε το πεδίο.'

          // Regular expression to match valid Excel cell coordinates
          const cellRegex = /^[A-Z]+\d+$/i

          switch (type) {
          case 'CONDITION_OPTION_NUMERIC':
            return /^-?\d+$/.test(value) || 'Παρακαλώ εισάγετε έναν έγκυρο αριθμό.'
          case 'CONDITION_OPTION_CELL':
            // Check if is a valid Excel cell
            return cellRegex.test(value) || 'Παρακαλώ εισάγετε ένα έγκυρο κελί αρχείου Excel.'
          case 'CONDITION_OPTION_MULTIPLE_CELLS':
            // Regular expression to match valid Excel cell sums
            if (!/^[0-9A-Z.,()+-/%*]+$/i.test(value)) return 'Παρακαλώ εισάγετε μία έγκυρη παράσταση κελιών αρχείου Excel.'
          
            // Split the input by the "+","-","*","/" operators and trim spaces
            const cellCoordinates = value.split(/[+\-*/]/).map(coord => {
              coord = coord.replace('(', '').replace(')', '')
              if (!coord.match(cellRegex)){
                return
              }

              return coord.trim()
            }).filter(object => object !== undefined)
          
            // Check if each part is a valid Excel cell coordinate
            return cellCoordinates.every(coord => cellRegex.test(coord))
          }
        },
        excelColumn: value => 
          !value ||
          /^[A-Z]+$/i.test(value) ||
          'Παρακαλώ εισάγετε έγκυρη στήλη Excel.'
        ,
        excelRow: value =>
          !value ||
          /^[1-9]\d*$/.test(value) ||
          'Παρακαλώ εισάγετε έγκυρη σειρά Excel.'
        ,
        grvat: value => {
          if (!value) {
            return true
          }
          const msg = 'Το ΑΦΜ δεν είναι έγκυρο'
          if (!/^(\d{9})$/.test(value)) {
            return msg
          }
          let total = 0
          const multipliers = [256, 128, 64, 32, 16, 8, 4, 2]

          // Extract the next digit and multiply by the counter.
          for (let i = 0; i < 8; i++) {
            total += Number(value.charAt(i)) * multipliers[i]
          }

          // Establish check digit.
          total = total % 11
          total = total > 9 ? 0 : total

          // Compare it with the last character of the VAT number. If it's the same, then it's valid.
          return total === Number(value.slice(8, 9)) || msg
        },
        iban: value => {
          if (!value) {
            return true
          }
          const msg = 'Το IBAN δεν είναι έγκυρο'

          const mod97 = str => {
            let checksum = str.slice(0, 2)
            let fragment
            for (let offset = 2; offset < str.length; offset += 7) {
              fragment = String(checksum) + str.substring(offset, offset + 7)
              checksum = parseInt(fragment, 10) % 97
            }

            return checksum
          }

          const CODE_LENGTHS = {
            AD: 24,
            AE: 23,
            AT: 20,
            AZ: 28,
            BA: 20,
            BE: 16,
            BG: 22,
            BH: 22,
            BR: 29,
            CH: 21,
            CY: 28,
            CZ: 24,
            DE: 22,
            DK: 18,
            DO: 28,
            EE: 20,
            ES: 24,
            FI: 18,
            FO: 18,
            FR: 27,
            GB: 22,
            GI: 23,
            GL: 18,
            GR: 27,
            GT: 28,
            HR: 21,
            HU: 28,
            IE: 22,
            IL: 23,
            IS: 26,
            IT: 27,
            JO: 30,
            KW: 30,
            KZ: 20,
            LB: 28,
            LI: 21,
            LT: 20,
            LU: 20,
            LV: 21,
            MC: 27,
            MD: 24,
            ME: 22,
            MK: 19,
            MR: 27,
            MT: 31,
            MU: 30,
            NL: 18,
            NO: 15,
            PK: 24,
            PL: 28,
            PS: 29,
            PT: 25,
            QA: 29,
            RO: 24,
            RS: 22,
            SA: 24,
            SE: 24,
            SI: 19,
            SK: 24,
            SM: 27,
            TN: 24,
            TR: 26,
            AL: 28,
            BY: 28,
            CR: 22,
            EG: 29,
            GE: 22,
            IQ: 23,
            LC: 32,
            SC: 31,
            ST: 25,
            SV: 28,
            TL: 23,
            UA: 29,
            VA: 22,
            VG: 24,
            XK: 20,
          }

          const iban = String(value)
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '') // keep only alphanumeric characters

          const code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/) // match and capture (1) the country code, (2) the check digits, and (3) the rest

          // check syntax and length
          if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
            return msg
          }

          // rearrange country code and check digits, and convert chars to ints
          const digits = (code[3] + code[1] + code[2]).replace(
            /[A-Z]/g,
            letter => letter.charCodeAt(0) - 55,
          )

          // final check
          return !!mod97(digits) || msg
        },
      }
    },
  },
}
