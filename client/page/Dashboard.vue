<template>
  <fragment>
    <div class="hero">
      <h1>Welcome to Four Yards!</h1>
      <p class="hero-paragraph">
        We are the premiere online yard work marketplace where anyone can find
        yard work to get paid for, or can post a listing for yard work that you
        need to have done.
      </p>
      <p class="hero-paragraph">
        Since March 2021, we have been the leading online yard work marketplace.
        We have since expanded to provide a place to find other forms of outdoor
        work for all seasons after the initial success with yard work in the
        four neighborhoods we initially launched in.
      </p>
    </div>
    <div class="container">
      <b-button id="FAB" variant="success" block href="/listing/create"
        >Post a Listing</b-button
      >
      <b-input v-model="searchBox" placeholder="Search..." @input="searchName">
      </b-input>
      <b-select
        v-if="workTypes != []"
        v-model="workTypeBox"
        :options="workTypes"
        placeholder="Select type of work"
        @input="searchType"
      >
      </b-select>
      <JobListingsTable :jobs="filteredJobs" />
    </div>
  </fragment>
</template>

<script>
//Import statements including components used on the page
import JobListingsTable from '../components/JobListingsTable.vue';

export default {
  //Page name
  name: 'dashboard-page',
  components: {
    //Name of any components used on the page
    JobListingsTable,
  },
  data() {
    return {
      //Any variables / data used on the page
      jobs: [],
      typeFilteredJobs: [],
      filteredJobs: [],
      prevSearchBox: '',
      searchBox: '',
      workTypes: [],
      prevWorkType: 0,
      workTypeBox: 0,
    };
  },

  mounted() {
    this.getJobs();
  },

  methods: {
    //Api calls to populate data
    async getJobs() {
      // [{
      //     id: 1,
      //     title: 'Hard Job',
      //     customer: 'Wesley Perrett',
      //     description: 'This is a description for a job',
      //     date: 'March 23, 2021',
      //   },]

      fetch('/api/listing')
        .then((res) => res.json())
        .then((res) => {
          this.jobs = res.data;
          this.filteredJobs = this.typeFilteredJobs = this.jobs;
        });

      fetch('/api/worktypes')
        .then((res) => res.json())
        .then((res) => {
          this.workTypes = res;
          this.workTypes.unshift({ value: 0, text: 'All' });
        });
    },

    // set filteredJobs to something more useful.
    // called as part of searchName.
    // uses typeFilteredJobs to cache.
    searchType() {
      if (this.workTypeBox == 0) {
        this.filteredJobs = this.jobs;
        return;
      }

      if (this.prevWorkType == this.workTypeBox) {
        this.filteredJobs = this.typeFilteredJobs;
        return;
      }

      this.typeFilteredJobs = this.filteredJobs = this.jobs.filter((x) => {
        return x.typeDetails.id == this.workTypeBox;
      });

      this.prevWorkType = this.workTypeBox;
    },

    // search for the string in the title and description
    searchName() {
      if (this.searchBox == this.prevSearchBox) return;

      this.searchType();

      this.filteredJobs = this.filteredJobs.filter((x) => {
        let a =
          new RegExp(this.searchBox, 'i').test(x.title) ||
          new RegExp(this.searchBox, 'i').test(x.description);

        console.log(a);
        return a;
      });

      this.prevSearchBox = this.searchBox;
    },
  },
};
</script>

<style>
/* Any styles specific to the page */
.addJob {
  margin-top: 20px;
}

.container {
  margin: 0px auto;
  padding: 0px;
}

.hero-paragraph {
  font-size: medium;
}

#FAB {
  margin-top: 20px;
}
</style>
