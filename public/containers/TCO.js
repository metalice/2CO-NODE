"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactLoaderSpinner = _interopRequireDefault(require("react-loader-spinner"));

var _Aux = _interopRequireDefault(require("../hoc/Aux"));

var _reactLoadScript = _interopRequireDefault(require("react-load-script"));

var _ModalExtend = _interopRequireDefault(require("./ModalExtend"));

var _CreditCardForm = _interopRequireDefault(require("./CreditCardForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var TCO =
/*#__PURE__*/
function (_Component) {
  _inherits(TCO, _Component);

  function TCO() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TCO);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TCO)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      sellerId: _this.props.sellerId,
      publishableKey: _this.props.publishableKey,
      generateTokenFor: _this.props.sandbox ? "sandbox" : "production",
      showModal: _this.props.showModal,
      showForm: _this.props.showForm,
      showLoading: _this.props.showLoading,
      scriptLoaded: false,
      scriptLoadingError: false,
      creatingTokenError: {
        errorCode: null,
        errorMessage: null
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "errorScriptLoadedHandler", function () {
      _this.setState(_objectSpread({}, _this.state, {
        scriptLoadingError: true
      }, _this.creatingTokenError));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scriptLoadedHandler", function () {
      _this.setState(_objectSpread({}, _this.state, {
        scriptLoaded: true
      }, _this.creatingTokenError));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "creatingTokenHandler", function (cardNumber, expiryDate, cvv) {
      var args = {
        sellerId: _this.state.sellerId,
        publishableKey: _this.state.publishableKeySandbox || _this.state.publishableKey,
        ccNo: cardNumber,
        cvv: cvv,
        expMonth: expiryDate[0],
        expYear: expiryDate[1]
      };

      _this.setState(_objectSpread({}, _this.state, {
        scriptLoaded: false,
        showForm: false
      }, _this.creatingTokenError));

      window.TCO.loadPubKey(_this.state.generateTokenFor, function () {
        window.TCO.requestToken(_this.successReturn, _this.failedReturn, args);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "successReturn", function (data) {
      _this.props.returnToken(data.response.token.token);

      _this.setState(_objectSpread({}, _this.state, {
        scriptLoaded: true,
        creatingTokenError: {
          errorCode: null,
          errorMessage: null
        }
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "failedReturn", function (data) {
      _this.setState(_objectSpread({}, _this.state, {
        showForm: true,
        scriptLoaded: true,
        creatingTokenError: {
          errorCode: data.errorCode,
          errorMessage: data.errorMsg
        }
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "creditCardDetails", function (_ref) {
      var cardNumber = _ref.cardNumber,
          expiryDate = _ref.expiryDate,
          cvv = _ref.cvv;

      _this.creatingTokenHandler(cardNumber, expiryDate.split("/"), cvv);
    });

    return _this;
  }

  _createClass(TCO, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var loader = !this.state.scriptLoaded ? _react.default.createElement(_reactLoaderSpinner.default, {
        type: "Bars",
        color: "#00BFFF",
        height: "100",
        width: "100"
      }) : null;

      var show = function show() {
        if (_this2.state.showModal) {
          return _react.default.createElement(_ModalExtend.default, {
            open: _this2.state.showModal
          }, _this2.state.showLoading ? loader : null, _this2.state.showForm ? _react.default.createElement(_CreditCardForm.default, {
            error: _this2.state.creatingTokenError,
            showForm: _this2.state.showForm,
            sendCCback: function sendCCback(data) {
              return _this2.creditCardDetails(data);
            }
          }) : null);
        } else {
          return _react.default.createElement(_Aux.default, null, _this2.state.showLoading ? loader : null, _this2.state.showForm ? _react.default.createElement(_CreditCardForm.default, {
            error: _this2.state.creatingTokenError,
            showForm: _this2.state.showForm,
            sendCCback: function sendCCback(data) {
              return _this2.creditCardDetails(data);
            }
          }) : null);
        }
      };

      return _react.default.createElement(_Aux.default, null, _react.default.createElement(_reactLoadScript.default, {
        url: "https://www.2checkout.com/checkout/api/2co.min.js",
        onCreate: this.loader,
        onError: this.errorScriptLoadedHandler,
        onLoad: this.scriptLoadedHandler
      }), show());
    }
  }]);

  return TCO;
}(_react.Component);

var _default = TCO;
exports.default = _default;