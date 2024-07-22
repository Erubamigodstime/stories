const moment = require('moment')

module.exports = {
    formatDate: function(date, format){
        return moment(date).format(format)
    },
    truncate: function(str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ''
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(''))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'            
            }

            return str

    },

    stripTag: function(input){
        return input.replace(/<(?:.|\n)*?>/gm, '');
    },
    // editIcon: function(storyUser, loggedUser, storyId, floating = true){
    //     if(storyUser.id.toString() == loggedUser.id.toString()){
    //         if (floating) {
    //             return `<a href="/stories/edit/${storyId}" class="btn btn-floating-halfway-fab blue"><i class
    //             ="fas fa-edit fa-small"></i></a>`                
    //         }
    //         else {
    //             return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
    //         }
    //     }
    // },

    editIcon: function(storyUser, loggedUser, storyId, floating = true) {
        if (storyUser && loggedUser && storyUser._id && loggedUser._id && storyUser._id.toString() === loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/stories/edit/${storyId}" class="btn btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
            } else {
                return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
            }
        } else {
            return ''; // Return an empty string if the users don't match or data is undefined
        }
    },


    select: function (selected, options) {
        return options
        .fn(this)
        .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
        )
        .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
        )

        
    }
}
    