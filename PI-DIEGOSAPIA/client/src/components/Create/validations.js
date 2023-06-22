const validations = (form) => {
    let error = {};
    const regex_url = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;

    if (!form.name) {
    error.name="You must complete it"
    }
    if(form.name.length > 30) {
        error.name = "The name shoud have less than 20 characters"
    }
    if(form.description.length === 0) {
        error.description = "Your game shoud have a Description"
    }
    if(form.released === '') {
        error.released = "Your videogame shoud have a released date"
    }
    if(form.genres.length > 4) {
        error.genres = "You can only choose 4 Genres"
    }
    if(form.genres.length === 0) {
        error.genres = "Your videogame shoud have at least one Genre"
    }
    if(form.platforms.length === 0) {
        error.platforms = "Your videogame shoud have at least one Platform"
    }
    if(form.platforms.length > 5) {
        error.platforms = "Your videogame can't have more than 5 Platforms"
    }
    if(!form.background_image.match(regex_url) ) {
        error.image = "You must update an URL with a picture"
    }
    if(form.background_image.length === '') {
        error.image = "You should insert a url picture"
    }
    return error;
}

export default validations;