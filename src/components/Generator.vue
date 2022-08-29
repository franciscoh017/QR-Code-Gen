<template>
  <form @submit.prevent="onSubmitHandler">
    <div class="mb-4">
      <div class="buttons has-addons">
        <button
          v-for="(type, index) in QRCodeTypesList"
          :key="index"
          class="button"
          :class="isSelected(type)"
          @click="selectedType = type"
        >
          {{type}}
        </button>
      </div>
    </div>

    <div v-if="selectedType === QRCodeTypes.URL" class="field has-addons">
      <div class="control is-expanded">
        <input
          v-model="url"
          type="text"
          class="input"
          placeholder="Enter URL"
          enter-key="submit"
        />
      </div>
      <div class="control">
        <button
          type="submit"
          class="button is-info"
          :disabled="!canSubmit"
        >
          Generate
        </button>
      </div>
    </div>

    <div v-if="selectedType === QRCodeTypes.WIFI" >
      <div class="field">
        <div class="control">
          <input
            v-model="wifiSettings.ssid"
            type="text"
            class="input"
            placeholder="Enter Network SSID"
          />
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
          <input
            v-model="wifiSettings.password"
            type="password"
            class="input"
            placeholder="Enter Password"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button
            type="submit"
            class="button is-info"
          >
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
const QRCodeTypesList = ['URL', 'WIFI'];
const QRCodeTypes = {
  URL: 'URL',
  WIFI: 'WIFI',
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
    qrCodeVal: null,
    selectedType: QRCodeTypes.URL,
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
      }
    },
    isSelected(type) {
      return this.selectedType === type ? ['is-primary', 'is-selected'] : [''];
    },
  }
}
</script>

<style>

</style>