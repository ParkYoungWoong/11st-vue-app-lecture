import axios from 'axios'

export default {
  install (Vue) {
    // this.$store.state.NAME.STATE
    // this.$search
    Vue.prototype.$search = async ({ searchText }) => {
      const { data } = await axios.get(`https://trusting-williams-8cacfb.netlify.app/.netlify/functions/search?apiKey=${process.env.API_KEY}&searchText=${searchText}`)
      return data
    }
  }
}
