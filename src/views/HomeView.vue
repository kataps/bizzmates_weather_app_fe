<template>
<div class="container-fluid">
    <div class="main-container pt-3">
        <h1 class="text-center mb-5" id="app-name">Weather</h1>
        <div class="input-group">
            <input
                class="form-control border-end-0 border rounded-pill"
                placeholder="Search City"
                type="text"
                v-model="city"
            />
            <span class="input-group-append ml-2">
                <button @click="searchWeather" class="btn text-white" type="button">
                    <i style="font-size:1.5rem" class="bi bi-search"></i>
                </button>
            </span>
        </div>
        <p class="mb-5 text-warning">{{ message }}</p>
        <weather-component ref="weatherComponent" />
        <venues-component :city="city" ref="venuesComponent" />
        <div class="cities mt-4">
            <h3><i class="bi bi-map"></i> Top Cities</h3>
            <div class="row">
                <div class="col-3 col-md-4 p-3" v-for="city in topCities" @click="quickPickCity(city)">
                    <span class="top-cities">
                        {{ city }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
.main-container {
    max-width: 1200px;
    margin: 0px auto;
}

.top-cities:hover {
    background-color: #ffff;
    color: black;
    border-radius: 0.5rem;
}

.top-cities {
    cursor: pointer;
    padding: 1rem;
}
</style>

<script>
'use strict';

import WeatherComponent from '@/components/WeatherComponent';
import VenuesComponent from '@/components/VenuesComponent';

const ALL_CITIES = [
    'Tokyo',
    'Yokohama',
    'Osaka',
    'Nagoya',
    'Sapporo',
    'Kobe',
    'Kyoto',
    'Fukuoka',
    'Kawasaki',
    'Hiroshima',
];

export default {
    components: {
        VenuesComponent,
        WeatherComponent,
    },

    data() {
        return {
            city: 'Osaka',
            message: null
        }
    },

    methods: {
        searchWeather() {
            // validate if city within japan
            const is_valid = this.allCities.find(city => city.toLowerCase() === this.city.toLowerCase());

            if (is_valid) {
                this.weatherComponent.getWeatherData(this.city);
                this.venuesComponent.reset();
                this.message = null;
            } else {
                this.message = 'Please input a valid City within Japan';
            }
        },

        quickPickCity(city) {
            this.city = city;
            this.weatherComponent.getWeatherData(city);
            this.venuesComponent.getCityVenues(city);
        }
    },

    computed: {
        topCities() {
            return [
                'Tokyo',
                'Yokohama',
                'Kyoto',
                'Osaka',
                'Sapporo',
                'Nagoya'
            ];
        },

        allCities() {
            return ALL_CITIES;
        },
    },

    mounted() {
        this.weatherComponent = this.$refs.weatherComponent;
        this.venuesComponent = this.$refs.venuesComponent;
        this.searchWeather();
    }
}
</script>
