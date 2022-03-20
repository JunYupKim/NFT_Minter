import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Input from '../elements/Input';
import { TransactionContext } from '../../context/NFTDataHandler';

import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}


const NFTs = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const [NFT, setNFT] = useState("")
  const { fetchNFTs } = useContext(TransactionContext);

  const outerClasses = classNames(
    'testimonial section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'When you are READY',
    paragraph: 'Click the button to see your minted work.'
  };
  const imagestyle = {
    height: "200px",  
    width: "200px",
    textalign: "center"
  
  };
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content"/>

          <div className = {tilesClasses}>
          <button className="center button button-primary button-wide-mobile button-sm"type="button"onClick={() => { fetchNFTs(setNFT) }}>Bring Your NFTS</button>

          </div>
          <p></p>
          <div className={tilesClasses}>
                     {
              NFT ? NFT.map((data) => {
                return (
                  <div >
                    <div className="tiles-item-inner">
                      <div className="testimonial-item-content">
                        <img className='w-full rounded-t-md center' style={imagestyle} src={data.value.file}></img>
                        <div className="text-sm mb-0">
                          <a>Title : {data.value.name}</a>
                          <p></p>
                          <p>Description : {data.value.description ? data.value.description.slice(0, 200) : "No Description"}</p>
                          <p>Minted At : {data.value.time}  </p>
                          <span className="testimonial-item-name text-color-high"> <p>Price : {data.value.price} Eth </p></span>
   
                        </div>
                      </div>
                      <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                                           </div>
                    </div>
                  </div>
                )
              }) : <div>You don't have NFTs Yet</div>
            }

          </div>
        </div>
      </div>
    </section>

  );
}

NFTs.propTypes = propTypes;
NFTs.defaultProps = defaultProps;

export default NFTs;