import React, { Component } from 'react'

export class NewsItesm extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, h100, date,author,sourceName} = this.props;
    return (
      <>
          <div className={`card ${h100}`}>
              <img src={imgUrl} className="card-img-top" alt="..."/>
              <div className="card-body">
                <span className='badge text-bg-info text-capitalize '>{sourceName}</span>
                <h5 className="card-title pt-3">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small class="text-info">By {author}</small></p>
                <p className="card-text"><small class="text-white">Data {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-primary">Read More</a>
              </div>
          </div>
    </>
    )
  }
}

export default NewsItesm

