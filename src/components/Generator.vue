<template>
  <form @submit.prevent="onSubmitHandler">
    <div class="mb-4">
      <div class="buttons has-addons">
        <button v-for="(type, index) in QRCodeTypesList" :key="index" class="button" :class="isSelected(type)"
          @click="selectedType = type">
          {{ type }}
        </button>
      </div>
    </div>

    <div v-if="selectedType === QRCodeTypes.URL" class="field has-addons">
      <div class="control is-expanded">
        <input v-model="url" type="text" class="input" placeholder="Enter URL" enter-key="submit" />
      </div>
      <div class="control">
        <button type="submit" class="button is-info" :disabled="!canSubmit">
          Generate
        </button>
      </div>
    </div>
    <div v-if="selectedType === QRCodeTypes.WIFI">
      <div class="field">
        <div class="control">
          <input v-model="wifiSettings.ssid" type="text" class="input" placeholder="Enter Network SSID" />
        </div>
      </div>
      <div class="field">
        <div class="select">
          <select v-model="wifiSettings.encription">
            <option disabled>Select Encription</option>
            <option v-for="(type, index) in encriptionTypesList" :key="index">
              {{ type }}
            </option>
          </select>
        </div>
      </div>
      <div v-if="wifiSettings.encription !== encriptionTypes.NONE" class="field">
        <div class="control">
          <input v-model="wifiSettings.password" type="password" class="input" placeholder="Enter Password" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button type="submit" class="button is-info">
            Generate
          </button>
        </div>
      </div>
    </div>
    <div v-if="selectedType === QRCodeTypes.VCARD">
      <div class="field is-horizontal">
        <div class="field-label is-normal has-text-left">
          <label class="label">Full Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input v-model="vcardSettings.firstname" type="text" class="input" placeholder="First Name" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="vcardSettings.lastname" type="text" class="input" placeholder="Last Name" />
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label has-text-left">
          <label class="label">Contact</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input v-model="vcardSettings.contact.phone" type="text" class="input" placeholder="Phone" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="vcardSettings.contact.email" type="email" class="input" placeholder="Email" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="vcardSettings.contact.website" type="text" class="input" placeholder="Website" />
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label has-text-left">
          <label class="label">Address</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input v-model="vcardSettings.address.street" type="text" class="input" placeholder="Street" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="vcardSettings.address.city" type="text" class="input" placeholder="City" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="vcardSettings.address.state" type="text" class="input" placeholder="State" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="vcardSettings.address.country" type="text" class="input" placeholder="Country" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="vcardSettings.address.zip" type="text" class="input" placeholder="Zip" />
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button type="submit" class="button is-info">
            Generate
          </button>
        </div>
      </div>
    </div>

    <div class="field mt-2">
      <div class="control">
        <label class="radio">
          <input v-model="options.width" type="radio" name="size" value="200">
          small
        </label>
        <label class="radio">
          <input v-model="options.width" type="radio" name="size" value="400">
          medium
        </label>
        <label class="radio">
          <input v-model="options.width" type="radio" name="size" value="800">
          large
        </label>
      </div>
    </div>
  </form>

  <vue-qrcode v-if="qrCodeVal" :value="qrCodeVal" :options="options"></vue-qrcode>
</template>

<script>
const QRCodeTypesList = ['URL', 'WIFI', 'VCARD'];
const QRCodeTypes = {
  URL: 'URL',
  WIFI: 'WIFI',
  VCARD: 'VCARD'
};

const encriptionTypesList = [
  'WPA',
  'WEP',
  'NONE',
];

const encriptionTypes = {
  WPA: 'WPA',
  WEP: 'WEP',
  NONE: 'NONE',
};

export default {
  data: () => ({
    url: '',
    wifiSettings: {
      ssid: '',
      password: '',
      encription: 'WPA',
    },
    vcardSettings: {
      firstname: '',
      lastname: '',
      contact: {
        phone: '',
        email: '',
        website: '',
      },
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        zip: '',
      },
    },
    qrCodeVal: null,
    selectedType: QRCodeTypes.VCARD,
    options: {
      width: 200,
      errorCorrectionLevel: 'Q',
      maskPattern: 4
    }
  }),
  computed: {
    canSubmit() {
      return this.isNotEmpty && this.isValidUrl;
    },
    isNotEmpty() {
      return this.url.length > 0;
    },
    isValidUrl() {
      return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.url);
    },
    QRCodeTypes() {
      return QRCodeTypes;
    },
    QRCodeTypesList() {
      return QRCodeTypesList;
    },
    encriptionTypesList() {
      return encriptionTypesList;
    },
    encriptionTypes() {
      return encriptionTypes;
    }
  },
  methods: {
    onSubmitHandler() {
      if (this.selectedType === QRCodeTypes.URL) {
        this.qrCodeVal = this.url;
      } else if (this.selectedType === QRCodeTypes.WIFI) {
        this.qrCodeVal = `WIFI:S:${this.wifiSettings.ssid};T:${this.wifiSettings.encription};`;
        if (this.wifiSettings.encription !== encriptionTypes.NONE) {
          this.qrCodeVal += `P:${this.wifiSettings.password};`;
        }
      } else if (this.selectedType === QRCodeTypes.VCARD) {
        this.qrCodeVal = `BEGIN:VCARD\nVERSION:3.0\nN:${this.vcardSettings.lastname};${this.vcardSettings.firstname}\n`;
        if (this.vcardSettings.contact.phone) {
          this.qrCodeVal += `TEL:${this.vcardSettings.contact.phone}\n`;
        }
        if (this.vcardSettings.contact.email) {
          this.qrCodeVal += `EMAIL:${this.vcardSettings.contact.email}\n`;
        }
        if (this.vcardSettings.contact.website) {
          this.qrCodeVal += `URL:${this.vcardSettings.contact.website}\n`;
        }
        if (this.vcardSettings.address.street) {
          this.qrCodeVal += `ADR:${this.vcardSettings.address.street}`;
        }
        if (this.vcardSettings.address.city) {
          this.qrCodeVal += `, ${this.vcardSettings.address.city}`;
        }
        if (this.vcardSettings.address.state) {
          this.qrCodeVal += `, ${this.vcardSettings.address.state}`;
        }
        if (this.vcardSettings.address.country) {
          this.qrCodeVal += `, ${this.vcardSettings.address.country}`;
        }
        if (this.vcardSettings.address.zip) {
          this.qrCodeVal += `, ${this.vcardSettings.address.zip}`;
        }

        this.qrCodeVal += '\n';

        this.qrCodeVal += 'END:VCARD';
      }
    },
    isSelected(type) {
      return this.selectedType === type ? ['is-primary', 'is-selected'] : [''];
    },
  }
}
</script>

<style></style>