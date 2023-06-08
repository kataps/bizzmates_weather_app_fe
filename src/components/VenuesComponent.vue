<template>
<button @click="getCityVenues" type="button" class="btn text-white mt-3 mb-3 border">
    Show Venues in {{ this.city }}
</button>

<loading v-if="isVenueLoading" class="text-center" :active='isVenueLoading' loader="bars" color="white" />
<div class="row row-cols-1 row-cols-md-4" v-else>
    <div :key="venue.fsq_id" class="col" v-for="venue in venues">
        <div class="card mb-4">
            <div class="card-body">
                <img :src="venue.image_url" class="card-img-top" alt="..." />
                <h5 class="card-title">{{ venue.name }}</h5>
                <div>
                    <strong>Address: </strong>
                    <span>{{ venue.location.formatted_address }}</span>
                </div>
                <div>
                    <strong>Post Code: </strong>
                    <span>{{ venue.location.postcode }}</span>
                </div>
                <div>
                    <strong>Region: </strong>
                    <span>{{ venue.location.region }}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
'use strict'

import Loading from 'vue-loading-overlay';

export default {
    name: 'VenuesComponent',

    components: {
        Loading,
    },

    props: {
        city: {
            type: String,
        }
    },

    data () {
        return {
            venues: null,
            photo_urls: null,
            isVenueLoading: false,
        }
    },

    methods: {
        reset() {
            this.venues = null;
            this.photo_urls = null;
        },

        getCityVenues() {
            let venues_url = this.url + 'cities/' + this.city;
            this.isVenueLoading = true;

            $.ajax({
                method: 'GET',
                url: venues_url,
                success: data => {
                    this.venues = data.results;
                    let fsq_ids = this.venues.map(venue => venue.fsq_id);

                    this.getPhotoUrls(fsq_ids);
                }
            });
        },

        getPhotoUrls(fsq_ids) {
            let venues_url = this.url + 'photos/venues/';

            $.ajax({
                url: venues_url,
                type: 'POST',
                dataType: 'json',
                data: {
                    fsq_ids: fsq_ids
                },
                success: data => {
                    this.photo_urls = data.photo_urls;

                    this.venues.forEach(venue => {
                        const photo = this.photo_urls.find(photo => photo.id === venue.fsq_id);

                        if (photo) {
                            venue.image_url = photo.url;
                        }
                    });

                    this.isVenueLoading = false;
                }
            });
        },
    },

    computed: {
        url() {
            return process.env.VUE_APP_WEATHER_API;
        }
    }
}
</script>
