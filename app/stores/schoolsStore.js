var dispatcher = require('../dispatcher');

function SchoolStore() {
    var listeners = [];
    var schools = [{
            name: "Lovedale",
            tagline: "A wonderful school"
        },
        {
            name: "Bishop",
            tagline: "An awesome school"
        },
        {
            name: "Daffodils",
            tagline: "An excellent school"
        }
    ];

    function getSchools() {
        return schools;
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    function addSchool(school) {
        schools.push(school);
        triggerListeners();

    }

    function deleteSchool() {
        var _index;
        school.map(function (s, _index) {
            if (s.name === school.name) {
                _index = index;
            }

            schools.splice(_index, 1);
            triggerListeners();
        });
    }

    function triggerListeners() {
        listeners.forEach(function (listener) {
            listener(schools);
        });
    }



    function handler(payload) {

        var split = payload.type.split(":");
        if (split[0] === 'school') {
            switch (split[1]) {
                case "addSchool":
                    addSchool(payload.school);
                    break;
                case "deleteSchool":
                    deleteSchool(payload.school);
                    break;
            }
        }
    }


    dispatcher.register(handler);

    return {
        getSchools: getSchools,
        onChange: onChange
    };

}

module.exports = SchoolStore();
