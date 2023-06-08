<template>
<div v-if="isWeatherLoading" class="text-center">
    <loading :active='isWeatherLoading' loader="bars" color="white" />
</div>
<div class="row p-2" v-else>
    <div
        class="col-sm-12 col-md-6 mb-3"
        id="active-forecast"
    >
        <h6>
            <i class="bi bi-geo-alt-fill"></i>
            {{ weather.city }} {{ weather.dateTime }}
        </h6>
        <div class="city-weather-details">
            <div class="temperature-value">
                <span>
                    <img :src="weather.icon" alt="">
                    {{ weather.temperature }}
                    &#8451
                </span>
            </div>

            <div class="weather-condition">
                {{ weather.description }}
            </div>
        </div>
    </div>
    <div class="col col-md-6">
        <div class="row">
            <div
                class="col-4 col-md-3 mb-1 forecast-small-cards"
                v-for="forecast in weatherData.list"
            >
                <div class="card text-center" @click="setActive(forecast)">
                    <div><strong>{{ getTime(forecast.dt_txt) }} </strong></div>
                    <div>
                        <!-- &#8451 is a celcius html code -->
                        <img
                            :alt="getDescription(forecast.weather[0])"
                            :src="getWeatherIcon(forecast.weather[0])"
                            class="img-fluid"
                        />
                        <p>
                            {{ getTemperature(forecast.main) }} &#8451
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
.forecast-small-cards:hover {
    cursor: pointer;
    padding: 0.5rem;
}

#active-forecast {
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.09);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15.7px);
    -webkit-backdrop-filter: blur(15.7px);
    border: 1px solid rgba(255, 255, 255, 0.16);

    padding: 1.5rem;
}
.city-weather-details {
    text-align: center;
    width: 100%;
    min-height: 15vh;
}

.city-weather-details .temperature-value {
    text-align: center;
    vertical-align: middle;
    font-size: 4rem;
    font-weight: 500;
}

.weather-condition {
    font-weight: bold;
}

</style>

<script>
'use strict';

import moment from 'moment';
import Loading from 'vue-loading-overlay';

export default {
    name: 'WeatherComponent',

    components: {
        Loading
    },

    data() {
        return {
            weatherData: null,
            isWeatherLoading: true,

            weather: {
                city: null,
                dateTime: null,

                temperature: null,
                icon: null,
                description: null,
            }
        }
    },

    methods: {
        getWeatherData(city) {
            let weather_url = this.url + 'cities/' + city + '/weather';
            this.isWeatherLoading = true;

            $.ajax({
                method: 'GET',
                url: weather_url,
                success: data => {
                    this.weatherData = data;

                    // initial display
                    this.setActive(this.weatherData.list[0]);
                }
            });
        },

        getTime(datetimeText) {
            const dateTimeTextFormat = this.dateTime(datetimeText)

            return moment(dateTimeTextFormat, 'MMM DD, YYYY [at] h:mm A').format("h:mm A");
        },

        dateTime(datetimeText) {
            return moment(datetimeText).format('MMM DD, YYYY [at] h:mm A');
        },

        setActive(forecast) {
            this.weather.city = this.weatherData.city.name;

            this.weather.dateTime = this.dateTime(forecast.dt_txt);
            this.weather.icon = this.getWeatherIcon(forecast.weather[0]);
            this.weather.description = this.getDescription(forecast.weather[0]);
            this.weather.temperature = this.getTemperature(forecast.main);

            this.isWeatherLoading = false;
        },

        getTemperature(main) {
            return Math.round(main.temp);
        },

        getDescription(weather) {
            return weather.description.toUpperCase();
        },

        getWeatherIcon(weather) {
            return 'https://openweathermap.org/img/wn/' + weather.icon + '@2x.png';
        }
    },

    computed: {
        url() {
            return process.env.VUE_APP_WEATHER_API;
        }
    }
}
</script>
