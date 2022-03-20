import React, { useEffect, useContext, useState } from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Web3 from 'web3';
import { useWeb3React } from "@web3-react/core";
import { TransactionContext } from '../../context/NFTDataHandler';

const propTypes = {
    ...SectionTilesProps.types
}

const defaultProps = {
    ...SectionTilesProps.defaults
}

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
    />
  );

const Inputs = ({
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

    const {formData, handleChange, mintNFT} = useContext(TransactionContext); 

    const handleSubmit = (e) => {
        const { name, amount, NFTFile, description } = formData;
        e.preventDefault(); 
        if (!name || !amount || !NFTFile || !description) {
            alert("🦊 Pleade fill out the form");
            return;
        }
        mintNFT();
    };

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
        pushLeft && 'push-left',        
        
    );


    const sectionHeader = {
        title: 'Mint your Artwork Here',
        paragraph: 'NFT stands for "non-fungible token," a type of digital certificate built on a blockchain -- usually Ethereum -- that guarantees ownership of a unique digital asset. Minting digital assets (everything from art to music to articles) as NFTs is one way for artists to monetize their work.'
    };

    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container">
                <div className={innerClasses}>
                    <SectionHeader data={sectionHeader} className="center-content" />
                    <div className={tilesClasses}>
                        <div className="tiles-item reveal-from-right" data-reveal-delay="200">
                            <div className="tiles-item-inner">
                                <div className="testimonial-item-content">
                                    <p className="text-lg mb-0.5 ">
                                        <form className="has-top-divider"> 
                                            <Input placeholder="Artwork Title" name="name" type="text" handleChange={handleChange} />
                                            <p></p>
                                            <Input placeholder="Artwork Link" name="NFTFile" type="text" handleChange={handleChange} />
                                            <p></p>
                                            <Input placeholder="Price (ETH)" name="amount" type="number" handleChange={handleChange} />
                                            <p></p>
                                            <Input placeholder="Enter Description" name="description" type="text" handleChange={handleChange} />
                                            <br></br>
                                        </form>
                                    </p>
                                </div>
                                <div className="testimonial-item-footer text-xs mb-0 ">
                                    <span className="testimonial-item-link ">
                                        <button className="button button-primary button-wide-mobile button-sm"  type="button" onClick={handleSubmit}> MINT </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Inputs;
