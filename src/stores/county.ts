import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/http/api'

const BASE_URL_API = 'https://idez-app-erjlhxxoya-uc.a.run.app/api/v1/county'
export const useCountyStore = defineStore('county', () => {
    const $stateCode = ref('DF')
    const $pageSize = ref(1)
    const $pageNumber = ref(1)
    const stateCode = computed(() => $stateCode)
    const pageSize = computed(() => $pageSize)
    const pageNumber = computed(() => $pageNumber)
    const $countyResponse = ref<object | null>(null)
    const countyResponse = computed(() => $countyResponse)
    function setStateCode(stateCode: string) {
        $stateCode.value = stateCode
    }
    function setPageSize(pageSize: number) {
        $pageSize.value = pageSize
    }
    function setPageNumber(pageNumber: number) {
        $pageNumber.value = pageNumber
    }
    function setCountyResponse(response: object | null) {
        console.log(response)
        $countyResponse.value = response
    }
    async function searchCounty() {
        setCountyResponse(null)
        console.log(stateCode.value.value)
        const { data } = await api.get(`${BASE_URL_API}/${stateCode.value.value}`, {
            params: {
                page_size: pageSize.value.value,
                page_number: pageNumber.value.value
            }
        })
        setCountyResponse(data)
    }
    return { setStateCode, setPageSize, setPageNumber, setCountyResponse, searchCounty, stateCode, pageSize, pageNumber, countyResponse }
})
