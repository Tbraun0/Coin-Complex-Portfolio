import React, { Component } from "react";
import {FlatList, VirtualizedList} from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import PropTypes from "prop-types";

export default class SearchableFlatlist extends Component {
  static INCLUDES = "includes";
  static WORDS = "words";
  getFilteredResults() {
    let { data, type, searchTerm, searchProperty, searchProperty1 } = this.props;
    return data.filter(
      item =>
        type && type === SearchableFlatlist.WORDS
          ? new RegExp(`\\b${searchTerm}`, "gi").test(item[searchProperty])
          : (new RegExp(`${searchTerm}`, "gi").test(item[searchProperty]) || 
                new RegExp(`${searchTerm}`, "gi").test(item[searchProperty1]))
    );
  }


  render() {
    return <VirtualizedList {...this.props} data={this.getFilteredResults()} />;
  }
}

SearchableFlatlist.propTypes = {
  data: PropTypes.array.isRequired,
  searchProperty: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  type: PropTypes.string
};
