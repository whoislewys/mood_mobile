import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import Images from '@assets/images';

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#666',
  },
  sliderDisabled: {
    backgroundColor: '#444',
  },
  explicitIcon: {
    tintColor: 'black',
    width: 12,
    height: 12,
  },
};

class ToggleSwitch extends React.Component {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onLabel: PropTypes.string,
    offLabel: PropTypes.string,
    buttonOnColor: PropTypes.string,
    buttonOffColor: PropTypes.string,
    sliderOnColor: PropTypes.string,
    sliderOffColor: PropTypes.string,
    buttonWidth: PropTypes.number.isRequired,
    buttonHeight: PropTypes.number.isRequired,
    buttonRadius: PropTypes.number,
    sliderWidth: PropTypes.number,
    sliderHeight: PropTypes.number,
    sliderRadius: PropTypes.number,
    margin: PropTypes.number,
    labelStyle: PropTypes.object,
    changeToggleStateOnLongPress: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
    onToggleLongPress: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    buttonOnColor: '#000',
    buttonOffColor: '#000',
    sliderOnColor: '#dba628',
    sliderOffColor: '#dba628',
    labelStyle: {},
    buttonRadius: 0,
    sliderRadius: 0,
    changeToggleStateOnLongPress: true,
  };

  constructor(props) {
    let toValue;
    super(props);
    this.props = props;
    let labelStyle = {};
    if (!this.props.labelStyle.fontSize) {
      labelStyle = {
        ...this.props.labelStyle,
        fontSize: 0.1 * this.props.buttonWidth,
      };
    } else {
      labelStyle = { ...this.props.labelStyle };
    }
    this.labelStyle = labelStyle;
    this.dimensions = this.calculateDimensions(this.props);
    this.offsetX = new Animated.Value(0);
    if (this.props.value) {
      toValue = this.dimensions.buttonWidth - this.dimensions.translateX;
    } else {
      toValue = 0;
    }
    Animated.timing(this.offsetX, {
      toValue,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let labelStyle;
    let toValue;
    if (!nextProps.labelStyle.fontSize) {
      labelStyle = {
        ...nextProps.labelStyle,
        fontSize: 0.1 * nextProps.buttonWidth,
      };
    } else {
      labelStyle = { ...nextProps.labelStyle };
    }
    this.labelStyle = labelStyle;
    this.dimensions = this.calculateDimensions(nextProps);
    if (nextProps.value) {
      toValue = this.dimensions.buttonWidth - this.dimensions.translateX;
    } else {
      toValue = 0;
    }
    Animated.timing(this.offsetX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  calculateDimensions = (toggleProps) => {
    let sliderWidth = 0;
    let sliderHeight = 0;
    let sliderRadius = 0;
    let margin = 0;
    if (!toggleProps.sliderWidth && !toggleProps.sliderHeight) {
      sliderHeight = 0.9 * toggleProps.buttonHeight;
      sliderWidth = sliderHeight;
    } else if (!toggleProps.sliderHeight) {
      sliderWidth = toggleProps.sliderWidth;
      sliderHeight = 0.9 * toggleProps.buttonHeight;
    } else {
      sliderWidth = toggleProps.sliderWidth;
      sliderHeight = toggleProps.sliderHeight;
    }
    if (toggleProps.buttonRadius && !toggleProps.sliderRadius) {
      sliderRadius = toggleProps.buttonRadius;
    } else {
      sliderRadius = toggleProps.sliderRadius;
    }
    if (!toggleProps.margin) {
      margin = parseInt(0.02 * toggleProps.buttonWidth);
    }
    let dimensions = {
      buttonWidth: toggleProps.buttonWidth,
      buttonHeight: toggleProps.buttonHeight,
      buttonRadius: parseInt(
        toggleProps.buttonRadius / 100 * toggleProps.buttonWidth, 10
      ),
      sliderWidth: sliderWidth,
      sliderHeight: sliderHeight,
      sliderRadius: parseInt(sliderRadius / 100 * sliderWidth, 10),
      margin: margin,
      translateX: 2 * parseInt(margin, 10) + sliderWidth
    };
    return dimensions;
  };

  toggleCommon = () => {
    return !this.props.value;
  };

  onTogglePress = () => {
    const newState = this.toggleCommon();
    this.props.onToggle(newState);
  };

  onToggleLongPress = () => {
    let newState = this.props.value;
    if (this.props.changeToggleStateOnLongPress) {
      newState = this.toggleCommon();
    }
    if (this.props.onToggleLongPress) {
      this.props.onToggleLongPress(newState);
    }
  };

  setBackgroundColor = (component) => {
    if (this.props.disabled) {
      let key = `${component}Disabled`;
      let { [key]: data } = styles;
      return data.backgroundColor;
    }
    if (this.props.value) {
      let key = `${component}OnColor`;
      let { [key]: data } = this.props;
      return data;
    }
    let key = `${component}OffColor`;
    let { [key]: data } = this.props;
    return data;
  };

  render() {
    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          disabled={this.props.disabled}
          style={{
            justifyContent: 'center',
            borderRadius: this.dimensions.buttonRadius,
            height: this.dimensions.buttonHeight,
            width: this.dimensions.buttonWidth,
            backgroundColor: this.setBackgroundColor('button'),
          }}
          activeOpacity={1}
          onPress={this.onTogglePress}
          onLongPress={this.onToggleLongPress}
        >
          {this.props.onLabel || this.props.offLabel ? (
            <Text style={[{ alignSelf: 'center' }, this.props.labelStyle]}>
              {this.props.value ? this.props.onLabel : this.props.offLabel}
            </Text>
          ) : null}
          <Animated.View
            style={{
              margin: this.dimensions.margin,
              transform: [{ translateX: this.offsetX }],
              position: 'absolute',
              width: this.dimensions.sliderWidth,
              height: this.dimensions.sliderHeight,
              borderRadius: this.dimensions.sliderRadius,
              backgroundColor: this.setBackgroundColor('slider'),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/*<Image source={Images.explicitIcon} style={styles.explicitIcon}/>*/}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ToggleSwitch;
