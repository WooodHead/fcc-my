var React = require("react");
var ReactDOM = require("react-dom");
var SchoolsList = require("./components/SchoolsList.jsx");
var schoolsStore = require("./stores/schoolsStore");
var _schools = schoolsStore.getSchools();
var _ = require("lodash");

var allWords = [];
schoolsStore.onChange(function (schools) {
    _schools = schools;
    render();
});



var Plugin = React.createClass({
    render: function () {
        // console.log(this.props.word);

        return <li className="plugin visited">
            <a href="/plugin/fugitive-vim">
                <h3 className="plugin-name integration">
                    {this.props.word.word}
                </h3>
                <span className="by">by</span>
                <span className="author"> Tim Pope</span>
                <div className="github-stars" title="" data-original-title="8267 stars on GitHub">
                    <i className="icon-star"></i>
                </div>
                <div className="plugin-users" title="" data-original-title="29162 Vundle/Pathogen/NeoBundle users on GitHub">
                    <i className="icon-user">
                    </i>
                </div>
                <p className="short-desc">
                    {this.props.word.definition}
                </p>
            </a>
        </li>;
    }
});


var PluginList = React.createClass({
    getInitialState: function () {
        return {
            isEditing: false,
            allWords: []
        };
    },
    fetchAllWords: function () {
        if (allWords.length !== 0) {
            this.setState({ allWords: allWords });
            return;
        }

        $.getJSON("/api/words", function (data) {
            var words = data.map(function (item, index) {
                item.key = 'word-' + index;
                return item;
            });

            this.setState({ allWords: words });
        }.bind(this));
    },

    componentDidMount: function () {
        this.fetchAllWords();
    },

    render: function () {

        var elements = this.state.allWords.map(function (item, index) {
            return <Plugin word={item} key={item.key} />;
        });
        return <div className='plugins-container'>
            <ul className='plugins'>
                {elements}
            </ul>
        </div>;
    }
});

function render() {
    // ReactDOM.render(<SchoolsList schools={_schools} />, document.getElementById("app"));
    ReactDOM.render(<PluginList />, document.getElementById("app"));
}

render();
