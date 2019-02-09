import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import Loading from "./Loading";
import Filter from "./Filter";
import NewArticle from "./NewArticle";
import "../styling/Articles.css";
import "../App.css";
import moment from "moment";
import _ from "lodash";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true
  };

  render() {
    if (this.state.isLoading) {
      return <Loading path="/" />;
    }

    return (
      <div className="Articles">
        <Filter path="/" sortArticlesBy={this.sortArticlesBy} />
        {this.props.username && <NewArticle path="/" />}
        <div className="Article-view">
          <h1>All Articles</h1>
          <p>
            {this.state.articles.map(article => {
              return (
                <div className="Individual-article">
                  <ul>
                    <li>
                      <b>{article.title}</b>
                    </li>
                    <li>Written By: {article.author}</li>
                    <li>
                      Created:
                      {moment(article.created_at)
                        .startOf("hour")
                        .fromNow()}
                    </li>
                    <li>
                      <Link to={`/articles/${article.article_id}`}>
                        Click here to read
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            })}
          </p>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    api.getArticles().then(articles => {
      this.setState({ articles, isLoading: false });
    })
  };

  sortArticlesBy = (filterType) => {
    switch(filterType) {
      case "MostComments":
        const sortedByComment = _.orderBy(this.state.articles, ['comment_count'],['desc'])
        this.setState({articles: sortedByComment})
        break;
      case "MostVotes":
        const sortedByVotes = _.orderBy(this.state.articles, ['votes'],['desc'])
        this.setState({articles: sortedByVotes})
        break; 
      case "Newest":
        const sortedByDate = _.orderBy(this.state.articles, ['created_at'],['desc'])
        this.setState({articles: sortedByDate})
        break; 
      default:
    }
  }
}

export default Articles;
