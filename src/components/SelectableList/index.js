/**
*
* SelectableList
*
*/

import React, { PropTypes } from 'react';
import { List, makeSelectable } from 'material-ui/List';

function wrapState(ComposedComponent) {
    return class SelectableList extends React.Component {
        static propTypes = {
            className: PropTypes.string.isRequired,
            children: PropTypes.node.isRequired,
            defaultValue: PropTypes.number.isRequired,
            onSelectedIndexChanged: PropTypes.func,
        };

        static defaultProps = {
            onSelectedIndexChanged: () => {},
        };

        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue,
            });
        }

        handleRequestChange = (event, index) => {
            if (index > -1) {
                this.props.onSelectedIndexChanged();
            }
        };

        setSelectedIndex(index) {
            this.setState({
                selectedIndex: index,
            });
        }

        render() {
            return (
              <ComposedComponent
                className={this.props.className}
                value={this.state.selectedIndex}
                onChange={this.handleRequestChange}
              >
                {this.props.children}
              </ComposedComponent>
            );
        }
    };
}

export default wrapState(makeSelectable(List));
