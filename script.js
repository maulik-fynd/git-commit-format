const MAX_ITEMS_STORE = 10;
const MAX_ITEMS_TO_DISPLAY = 5;

var app = new Vue({
  el: "#app",
  data: {
    trackerId: "",
    donePercentage: "",
    hours: "",
    commitMessage: "",
    isCopied: false,
    commitLine: "",
    lastCopiedItems: [],
  },
  mounted() {
    this.renderTickets();
  },
  methods: {
    extractTrackerId(text) {
      var jira_matcher = /([A-Z][A-Z0-9]+-[0-9]+)/g;
      const jiraId = String(text).match(jira_matcher);
      return String(jiraId);
    },
    async copyCommitLine() {
      try {
        const textToCopy = document.querySelector("#commitLine").textContent;
        await navigator.clipboard.writeText(textToCopy);
        this.isCopied = true;
        const itemToStore = this.extractTrackerId(this.trackerId);

        const lsItems = lsLoad("lastTickets");
        if (lsItems && Array.isArray(lsItems) && !lsItems.includes(itemToStore)) {
          lsPrependItemToArray("lastTickets", itemToStore);
        }

        this.renderTickets();
      } catch (e) {
        console.log(e);
        alert("Cannot copy");
      }
    },

    renderTickets() {
      this.lastCopiedItems = lsLoad("lastTickets") || [];
      if (this.lastCopiedItems.length === 0) lsStore("lastTickets", this.lastCopiedItems);

      // localStorage clean up process
      if (this.lastCopiedItems.length > MAX_ITEMS_STORE) {
        const howManyToDelete = Number(this.lastCopiedItems.length - MAX_ITEMS_STORE);
        this.lastCopiedItems.splice(this.lastCopiedItems.length - howManyToDelete, howManyToDelete);
        lsStore("lastTickets", this.lastCopiedItems);
      }
      this.lastCopiedItems = this.lastCopiedItems.slice(0, MAX_ITEMS_TO_DISPLAY);
    },
  },
  computed: {
    getTrackerId() {
      return this.extractTrackerId(this.trackerId);
    },
  },
});
