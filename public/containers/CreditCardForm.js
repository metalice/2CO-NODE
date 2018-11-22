"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Aux = _interopRequireDefault(require("../hoc/Aux"));

var _cardReact = _interopRequireDefault(require("card-react"));

require("./CreditCardForm.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CreditCardForm =
/*#__PURE__*/
function (_Component) {
  _inherits(CreditCardForm, _Component);

  function CreditCardForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CreditCardForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CreditCardForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      error: {
        message: null
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "submitPaymentHandler", function (event) {
      event.preventDefault();
      var extractedValues = [];

      for (var i = 0; i < 4; i++) {
        var currentValue = event.target.elements[i].value;

        if (currentValue === null || currentValue === "") {
          _this.setState(_objectSpread({}, _this.state, {
            error: {
              message: "Please fill all fields before submitting"
            }
          }));

          return;
        } else {
          extractedValues.push(currentValue);

          _this.setState(_objectSpread({}, _this.state, {
            error: {
              message: null
            }
          }));
        }
      }

      extractedValues.pop();

      var _extractedValues$map = extractedValues.map(function (value) {
        return value.replace(/\s/gm, "");
      }),
          _extractedValues$map2 = _slicedToArray(_extractedValues$map, 3),
          cardNumber = _extractedValues$map2[0],
          expiryDate = _extractedValues$map2[1],
          cvv = _extractedValues$map2[2];

      _this.props.sendCCback({
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv
      });
    });

    return _this;
  }

  _createClass(CreditCardForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var showEmptyError = this.state.error.message ? _react.default.createElement("p", {
        style: {
          color: "red"
        }
      }, this.state.error.message) : null;
      var showTokenError = this.props.error.errorMessage ? _react.default.createElement("p", {
        style: {
          color: "red"
        }
      }, "Something went wrong. Please try again.") : null;
      var form = this.props.showForm ? _react.default.createElement("div", {
        className: "credit-card-form"
      }, _react.default.createElement("div", {
        id: "card-wrapper",
        className: "card-wrapper"
      }), _react.default.createElement(_cardReact.default, {
        container: "card-wrapper",
        formInputsNames: {
          number: "CCnumber",
          expiry: "CCexpiry",
          cvc: "CCcvc",
          name: "CCname"
        }
      }, showEmptyError || showTokenError, _react.default.createElement("form", {
        onSubmit: function onSubmit(event) {
          return _this2.submitPaymentHandler(event);
        },
        className: "form-container"
      }, _react.default.createElement("input", {
        placeholder: "Card number",
        type: "text",
        name: "CCnumber"
      }), _react.default.createElement("input", {
        placeholder: "MM/YYYY",
        type: "text",
        name: "CCexpiry"
      }), _react.default.createElement("input", {
        placeholder: "CVV",
        type: "text",
        name: "CCcvc"
      }), _react.default.createElement("input", {
        type: "submit",
        value: "Submit Payment"
      })))) : null;
      return _react.default.createElement(_Aux.default, null, form);
    }
  }]);

  return CreditCardForm;
}(_react.Component);

exports.default = CreditCardForm;