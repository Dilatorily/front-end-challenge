import React from 'react';
import Radium from 'radium';
import onClickOutside from 'react-onclickoutside';

const styles = {
  container: {
    position: 'relative',
  },
  button: {
    margin: 0,
    padding: 0,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    background: 'none',
    color: '#303030',
  },
  list: {
    display: 'none',
    position: 'absolute',
    zIndex: 1,
    margin: 0,
    padding: 5,
    listStyleType: 'none',
    backgroundColor: 'white',
    maxWidth: 250,
    maxHeight: 200,
    overflowY: 'auto',
    border: '1px solid #F7F7F7',
    borderRadius: 2,
  },
  activeList: {
    display: 'block',
  },
  element: {
    padding: '1px 0',
  },
  reset: {
    borderBottom: '1px solid #E5E5E5',
    marginBottom: 1,
  },
  selectButton: {
    margin: 0,
    padding: 0,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    background: 'none',
    color: '#303030',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 300,
  },
};

class MultiSelect extends React.Component {
  state = { isOpen: false }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleClickOutside = () => {
    this.setState({ isOpen: false });
  }

  handleChange = value => () => this.props.onChange(value)

  render() {
    const {
      activeListStyle,
      buttonStyle,
      children,
      elementStyle,
      listStyle,
      options,
      selectButtonStyle,
      style,
      value,
    } = this.props;
    return (
      <div style={[styles.container, style]}>
        <button
          style={[styles.button, buttonStyle]}
          onClick={this.handleClick}
        >
          {children}
        </button>
        <ul
          style={[
            styles.list,
            this.state.isOpen && styles.activeList,
            listStyle,
            this.state.isOpen && activeListStyle,
          ]}
        >
          <li style={[styles.element, styles.reset, elementStyle]}>
            <button
              onClick={this.props.onReset}
              style={[styles.selectButton, selectButtonStyle]}
            >
              Reset Selection
            </button>
          </li>
          {
            options.map(option => (
              <li key={option.value} style={[styles.element, elementStyle]}>
                <button
                  onClick={this.handleChange(option.value)}
                  style={[styles.selectButton, selectButtonStyle]}
                  title={option.text}
                >
                  <span className={`fa ${value.includes(option.value) ? 'fa-check-square-o' : 'fa-square-o'}`} /> {option.text}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

MultiSelect.propTypes = {
  activeListStyle: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  buttonStyle: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: React.PropTypes.node,
  elementStyle: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  listStyle: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onChange: React.PropTypes.func,
  onReset: React.PropTypes.func,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.string,
    text: React.PropTypes.string,
  })).isRequired,
  selectButtonStyle: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  style: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  value: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

MultiSelect.defaultProps = {
  activeListStyle: {},
  buttonStyle: {},
  children: 'Select',
  elementStyle: {},
  listStyle: {},
  onChange: () => {},
  onReset: () => {},
  selectButtonStyle: {},
  style: {},
};

export default onClickOutside(Radium(MultiSelect));
