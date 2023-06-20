<script setup lang="ts">
import { useCountyStore } from '@/stores/county'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { reactive, ref } from 'vue'

const store = useCountyStore()
const stateCode = store.stateCode
const pageSize = store.pageSize
const pageNumber = store.pageNumber
const updateStateCode = (stateCode: string) => store.setStateCode(stateCode)
const updatePageSize = (pageSize: string) => store.setPageSize(Number(pageSize))
const updatePageNumber = (pageNumber: string) => store.setPageNumber(Number(pageNumber))
const countyResponse = store.countyResponse
const responseMessage = ref('Waiting search...')
const isLoading = ref(false)
const searchCounty = async () => {
  isLoading.value = true
  responseMessage.value = 'Loading...'
  await store.searchCounty()
  isLoading.value = false
  responseMessage.value = 'Response was:'
}
const STATE_LIST = [
  'DF',
  'SP',
  'RJ',
  'GO',
  'SC',
  'MT',
  'MS',
  'PR',
  'RS',
  'MG',
  'ES',
  'BA',
  'SE',
  'AL',
  'PE',
  'PB',
  'PI',
  'RN',
  'MA',
  'CE',
  'RO',
  'AM',
  'RR',
  'AC',
  'PA',
  'AP',
  'TO'
]

window.addEventListener('keypress', (e) => {
  const { key } = e
  if (key === 'Enter') {
    searchCounty()
    return
  }
})
</script>

<template>
  <div class="content">
    <v-row justify="center">
      <v-col cols="12">
        <h1>
          <strong>API County Brazil</strong>
          <br />
          - Find Brazil County by State Code -
        </h1>
      </v-col>
      <v-col cols="12" md="4">
        <div class="brasil-img__container">
          <v-img
            src="https://upload.wikimedia.org/wikipedia/commons/b/be/Mapa_do_Brasil_com_a_Bandeira_Nacional.png"
            alt=""
            aspect-ratio="16/9"
            cover
            max-height="80%"
            max-width="80%"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-autocomplete
          :model-value="stateCode"
          :items="STATE_LIST"
          @update:modelValue="updateStateCode"
          label="State Code"
          variant="outlined"
          required
          :no-data-text="'No State Code found'"
          @keypress.enter="searchCounty"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="pageSize"
          @input="updatePageSize($event.target.value)"
          label="Page Size"
          variant="outlined"
          hide-details
          single-line
          pattern="\d*"
          inputmode="numeric"
          type="number"
          min="1"
          @keypress.enter="searchCounty"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="pageNumber"
          @input="updatePageNumber($event.target.value)"
          label="Page Number"
          variant="outlined"
          hide-details
          single-line
          pattern="\d*"
          inputmode="numeric"
          type="number"
          min="1"
          @keypress.enter="searchCounty"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          :block="true"
          :loading="isLoading"
          color="#01579B"
          class="white--text"
          @click.stop="searchCounty"
          variant="tonal"
          @keypress.enter="searchCounty"
        >
          SEARCH COUNTY
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>{{ responseMessage }}</h3>
        <div class="json-response" v-if="countyResponse !== null">
          <vue-json-pretty
            :data="countyResponse"
            :show-icon="true"
            :show-line-number="true"
            :show-length="true"
            :deep="3"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.content {
  display: grid;
  place-content: center;
  text-align: center;
}
.brasil-img__container {
  max-height: 55vh;
  max-width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
}
.brasil-img__container > img {
  width: 80%;
  height: 80%;
}

.json-response {
}
</style>
