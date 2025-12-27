import React from 'react'
import "./Footer.css"
import instagram_icon from '../../assets/instagram_icon.avif'
import youtube_icon from '../../assets/youtubepic.avif'
import facebook_icon from '../../assets/facebook_icon.avif'
import twitter_icon from '../../assets/twitterpic.avif'
const Footer = () => {
  return (
    <div className='Footer'>
      <div className="Footer-icons">
        <img src={instagram_icon} alt=""/>
        <img src={youtube_icon} alt=""/>
        <img src={facebook_icon} alt=""/>
        <img src={twitter_icon} alt=""/>
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>@ 2025 Roshini.All rights reserved</p>
    </div>
  )
}
export default Footer;
