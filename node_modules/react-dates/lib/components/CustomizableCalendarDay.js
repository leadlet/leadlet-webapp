Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PureCustomizableCalendarDay = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _airbnbPropTypes = require('airbnb-prop-types');

var _reactWithStyles = require('react-with-styles');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _getCalendarDaySettings = require('../utils/getCalendarDaySettings');

var _getCalendarDaySettings2 = _interopRequireDefault(_getCalendarDaySettings);

var _constants = require('../constants');

var _DefaultTheme = require('../theme/DefaultTheme');

var _DefaultTheme2 = _interopRequireDefault(_DefaultTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var color = _DefaultTheme2['default'].reactDates.color;


function getStyles(stylesObj, isHovered) {
  if (!stylesObj) return null;

  var hover = stylesObj.hover;

  if (isHovered && hover) {
    return hover;
  }

  return stylesObj;
}

var DayStyleShape = _propTypes2['default'].shape({
  background: _propTypes2['default'].string,
  border: (0, _airbnbPropTypes.or)([_propTypes2['default'].string, _propTypes2['default'].number]),
  color: _propTypes2['default'].string,

  hover: _propTypes2['default'].shape({
    background: _propTypes2['default'].string,
    border: (0, _airbnbPropTypes.or)([_propTypes2['default'].string, _propTypes2['default'].number]),
    color: _propTypes2['default'].string
  })
});

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, {
  day: _reactMomentProptypes2['default'].momentObj,
  daySize: _airbnbPropTypes.nonNegativeInteger,
  isOutsideDay: _propTypes2['default'].bool,
  modifiers: _propTypes2['default'].instanceOf(Set),
  isFocused: _propTypes2['default'].bool,
  tabIndex: _propTypes2['default'].oneOf([0, -1]),
  onDayClick: _propTypes2['default'].func,
  onDayMouseEnter: _propTypes2['default'].func,
  onDayMouseLeave: _propTypes2['default'].func,
  renderDayContents: _propTypes2['default'].func,
  ariaLabelFormat: _propTypes2['default'].string,

  // style overrides
  defaultStyles: DayStyleShape,
  outsideStyles: DayStyleShape,
  todayStyles: DayStyleShape,
  highlightedCalendarStyles: DayStyleShape,
  blockedMinNightsStyles: DayStyleShape,
  blockedCalendarStyles: DayStyleShape,
  blockedOutOfRangeStyles: DayStyleShape,
  hoveredSpanStyles: DayStyleShape,
  selectedSpanStyles: DayStyleShape,
  lastInRangeStyles: DayStyleShape,
  selectedStartStyles: DayStyleShape,
  selectedEndStyles: DayStyleShape,
  selectedStyles: DayStyleShape,
  afterHoveredStartStyles: DayStyleShape,

  // internationalization
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.CalendarDayPhrases))
}));

var defaultProps = {
  day: (0, _moment2['default'])(),
  daySize: _constants.DAY_SIZE,
  isOutsideDay: false,
  modifiers: new Set(),
  isFocused: false,
  tabIndex: -1,
  onDayClick: function () {
    function onDayClick() {}

    return onDayClick;
  }(),
  onDayMouseEnter: function () {
    function onDayMouseEnter() {}

    return onDayMouseEnter;
  }(),
  onDayMouseLeave: function () {
    function onDayMouseLeave() {}

    return onDayMouseLeave;
  }(),

  renderDayContents: null,
  ariaLabelFormat: 'dddd, LL',

  // style defaults
  defaultStyles: {
    border: '1px solid ' + String(color.core.borderLight),
    color: color.text,
    background: color.background,

    hover: {
      background: color.core.borderLight,
      border: '1px double ' + String(color.core.borderLight),
      color: 'inherit'
    }
  },
  outsideStyles: {
    background: color.outside.backgroundColor,
    border: 0,
    color: color.outside.color
  },
  todayStyles: {},
  highlightedCalendarStyles: {
    background: color.highlighted.backgroundColor,
    color: color.highlighted.color,

    hover: {
      background: color.highlighted.backgroundColor_hover,
      color: color.highlighted.color_active
    }
  },
  blockedMinNightsStyles: {
    background: color.minimumNights.backgroundColor,
    border: '1px solid ' + String(color.minimumNights.borderColor),
    color: color.minimumNights.color,

    hover: {
      background: color.minimumNights.backgroundColor_hover,
      color: color.minimumNights.color_active
    }
  },
  blockedCalendarStyles: {
    background: color.blocked_calendar.backgroundColor,
    border: '1px solid ' + String(color.blocked_calendar.borderColor),
    color: color.blocked_calendar.color,

    hover: {
      background: color.blocked_calendar.backgroundColor_hover,
      border: '1px solid ' + String(color.blocked_calendar.borderColor),
      color: color.blocked_calendar.color_active
    }
  },
  blockedOutOfRangeStyles: {
    background: color.blocked_out_of_range.backgroundColor,
    border: '1px solid ' + String(color.blocked_out_of_range.borderColor),
    color: color.blocked_out_of_range.color,

    hover: {
      background: color.blocked_out_of_range.backgroundColor_hover,
      border: '1px solid ' + String(color.blocked_out_of_range.borderColor),
      color: color.blocked_out_of_range.color_active
    }
  },
  hoveredSpanStyles: {
    background: color.hoveredSpan.backgroundColor,
    border: '1px solid ' + String(color.hoveredSpan.borderColor),
    color: color.hoveredSpan.color,

    hover: {
      background: color.hoveredSpan.backgroundColor_hover,
      border: '1px solid ' + String(color.hoveredSpan.borderColor),
      color: color.hoveredSpan.color_active
    }
  },
  selectedSpanStyles: {
    background: color.selectedSpan.backgroundColor,
    border: '1px solid ' + String(color.selectedSpan.borderColor),
    color: color.selectedSpan.color,

    hover: {
      background: color.selectedSpan.backgroundColor_hover,
      border: '1px solid ' + String(color.selectedSpan.borderColor),
      color: color.selectedSpan.color_active
    }
  },
  lastInRangeStyles: {
    borderRight: color.core.primary
  },
  selectedStartStyles: {},
  selectedEndStyles: {},
  selectedStyles: {
    background: color.selected.backgroundColor,
    border: '1px solid ' + String(color.selected.borderColor),
    color: color.selected.color,

    hover: {
      background: color.selected.backgroundColor_hover,
      border: '1px solid ' + String(color.selected.borderColor),
      color: color.selected.color_active
    }
  },
  afterHoveredStartStyles: {},

  // internationalization
  phrases: _defaultPhrases.CalendarDayPhrases
};

var CustomizableCalendarDay = function (_React$Component) {
  _inherits(CustomizableCalendarDay, _React$Component);

  function CustomizableCalendarDay() {
    var _ref;

    _classCallCheck(this, CustomizableCalendarDay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = CustomizableCalendarDay.__proto__ || Object.getPrototypeOf(CustomizableCalendarDay)).call.apply(_ref, [this].concat(args)));

    _this.state = {
      isHovered: false
    };

    _this.setButtonRef = _this.setButtonRef.bind(_this);
    return _this;
  }

  _createClass(CustomizableCalendarDay, [{
    key: 'shouldComponentUpdate',
    value: function () {
      function shouldComponentUpdate(nextProps, nextState) {
        return (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
      }

      return shouldComponentUpdate;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate(prevProps) {
        var _props = this.props,
            isFocused = _props.isFocused,
            tabIndex = _props.tabIndex;

        if (tabIndex === 0) {
          if (isFocused || tabIndex !== prevProps.tabIndex) {
            this.buttonRef.focus();
          }
        }
      }

      return componentDidUpdate;
    }()
  }, {
    key: 'onDayClick',
    value: function () {
      function onDayClick(day, e) {
        var onDayClick = this.props.onDayClick;

        onDayClick(day, e);
      }

      return onDayClick;
    }()
  }, {
    key: 'onDayMouseEnter',
    value: function () {
      function onDayMouseEnter(day, e) {
        var onDayMouseEnter = this.props.onDayMouseEnter;

        this.setState({ isHovered: true });
        onDayMouseEnter(day, e);
      }

      return onDayMouseEnter;
    }()
  }, {
    key: 'onDayMouseLeave',
    value: function () {
      function onDayMouseLeave(day, e) {
        var onDayMouseLeave = this.props.onDayMouseLeave;

        this.setState({ isHovered: false });
        onDayMouseLeave(day, e);
      }

      return onDayMouseLeave;
    }()
  }, {
    key: 'onKeyDown',
    value: function () {
      function onKeyDown(day, e) {
        var onDayClick = this.props.onDayClick;
        var key = e.key;

        if (key === 'Enter' || key === ' ') {
          onDayClick(day, e);
        }
      }

      return onKeyDown;
    }()
  }, {
    key: 'setButtonRef',
    value: function () {
      function setButtonRef(ref) {
        this.buttonRef = ref;
      }

      return setButtonRef;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _this2 = this;

        var _props2 = this.props,
            day = _props2.day,
            ariaLabelFormat = _props2.ariaLabelFormat,
            daySize = _props2.daySize,
            isOutsideDay = _props2.isOutsideDay,
            modifiers = _props2.modifiers,
            tabIndex = _props2.tabIndex,
            renderDayContents = _props2.renderDayContents,
            styles = _props2.styles,
            phrases = _props2.phrases,
            defaultStylesWithHover = _props2.defaultStyles,
            outsideStylesWithHover = _props2.outsideStyles,
            todayStylesWithHover = _props2.todayStyles,
            highlightedCalendarStylesWithHover = _props2.highlightedCalendarStyles,
            blockedMinNightsStylesWithHover = _props2.blockedMinNightsStyles,
            blockedCalendarStylesWithHover = _props2.blockedCalendarStyles,
            blockedOutOfRangeStylesWithHover = _props2.blockedOutOfRangeStyles,
            hoveredSpanStylesWithHover = _props2.hoveredSpanStyles,
            selectedSpanStylesWithHover = _props2.selectedSpanStyles,
            lastInRangeStylesWithHover = _props2.lastInRangeStyles,
            selectedStartStylesWithHover = _props2.selectedStartStyles,
            selectedEndStylesWithHover = _props2.selectedEndStyles,
            selectedStylesWithHover = _props2.selectedStyles,
            afterHoveredStartStylesWithHover = _props2.afterHoveredStartStyles;
        var isHovered = this.state.isHovered;


        if (!day) return _react2['default'].createElement('td', null);

        var _getCalendarDaySettin = (0, _getCalendarDaySettings2['default'])(day, ariaLabelFormat, daySize, modifiers, phrases),
            daySizeStyles = _getCalendarDaySettin.daySizeStyles,
            useDefaultCursor = _getCalendarDaySettin.useDefaultCursor,
            selected = _getCalendarDaySettin.selected,
            hoveredSpan = _getCalendarDaySettin.hoveredSpan,
            isOutsideRange = _getCalendarDaySettin.isOutsideRange,
            ariaLabel = _getCalendarDaySettin.ariaLabel;

        var defaultStyles = getStyles(defaultStylesWithHover, isHovered);
        var outsideStyles = getStyles(outsideStylesWithHover, isHovered);
        var todayStyles = getStyles(todayStylesWithHover, isHovered);
        var highlightedCalendarStyles = getStyles(highlightedCalendarStylesWithHover, isHovered);
        var blockedMinNightsStyles = getStyles(blockedMinNightsStylesWithHover, isHovered);
        var blockedCalendarStyles = getStyles(blockedCalendarStylesWithHover, isHovered);
        var blockedOutOfRangeStyles = getStyles(blockedOutOfRangeStylesWithHover, isHovered);
        var hoveredSpanStyles = getStyles(hoveredSpanStylesWithHover, isHovered);
        var selectedSpanStyles = getStyles(selectedSpanStylesWithHover, isHovered);
        var lastInRangeStyles = getStyles(lastInRangeStylesWithHover, isHovered);
        var selectedStartStyles = getStyles(selectedStartStylesWithHover, isHovered);
        var selectedEndStyles = getStyles(selectedEndStylesWithHover, isHovered);
        var selectedStyles = getStyles(selectedStylesWithHover, isHovered);
        var afterHoveredStartStyles = getStyles(afterHoveredStartStylesWithHover, isHovered);

        return _react2['default'].createElement(
          'td',
          _extends({}, (0, _reactWithStyles.css)(styles.CalendarDay, useDefaultCursor && styles.CalendarDay__defaultCursor, daySizeStyles, defaultStyles, isOutsideDay && outsideStyles, modifiers.has('today') && todayStyles, modifiers.has('highlighted-calendar') && highlightedCalendarStyles, modifiers.has('blocked-minimum-nights') && blockedMinNightsStyles, modifiers.has('blocked-calendar') && blockedCalendarStyles, hoveredSpan && hoveredSpanStyles, modifiers.has('after-hovered-start') && afterHoveredStartStyles, modifiers.has('selected-span') && selectedSpanStyles, modifiers.has('last-in-range') && lastInRangeStyles, modifiers.has('selected-start') && selectedStartStyles, modifiers.has('selected-end') && selectedEndStyles, selected && selectedStyles, isOutsideRange && blockedOutOfRangeStyles), {
            role: 'button' // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
            , ref: this.setButtonRef,
            'aria-label': ariaLabel,
            onMouseEnter: function () {
              function onMouseEnter(e) {
                _this2.onDayMouseEnter(day, e);
              }

              return onMouseEnter;
            }(),
            onMouseLeave: function () {
              function onMouseLeave(e) {
                _this2.onDayMouseLeave(day, e);
              }

              return onMouseLeave;
            }(),
            onMouseUp: function () {
              function onMouseUp(e) {
                e.currentTarget.blur();
              }

              return onMouseUp;
            }(),
            onClick: function () {
              function onClick(e) {
                _this2.onDayClick(day, e);
              }

              return onClick;
            }(),
            onKeyDown: function () {
              function onKeyDown(e) {
                _this2.onKeyDown(day, e);
              }

              return onKeyDown;
            }(),
            tabIndex: tabIndex
          }),
          renderDayContents ? renderDayContents(day, modifiers) : day.format('D')
        );
      }

      return render;
    }()
  }]);

  return CustomizableCalendarDay;
}(_react2['default'].Component);

CustomizableCalendarDay.propTypes = propTypes;
CustomizableCalendarDay.defaultProps = defaultProps;

exports.PureCustomizableCalendarDay = CustomizableCalendarDay;
exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref2) {
  var font = _ref2.reactDates.font;
  return {
    CalendarDay: {
      boxSizing: 'border-box',
      cursor: 'pointer',
      fontSize: font.size,
      textAlign: 'center',

      ':active': {
        outline: 0
      }
    },

    CalendarDay__defaultCursor: {
      cursor: 'default'
    }
  };
})(CustomizableCalendarDay);