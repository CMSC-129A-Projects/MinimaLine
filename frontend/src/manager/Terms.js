import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

const Terms = () => {
  return (
    <Wrapper>
      <ArrowWrapper>
        <Link to="/sign-up" className="back">
          <BiArrowBack/>
        </Link>
      </ArrowWrapper>
    <Container>
      <Form>
            <h2>Privacy Policy and Terms of Service</h2>
            <h3><h4>1. Introduction</h4><br />
              Welcome to MinimaLine!<br /><br />
              These Terms of Service govern your use of our website located at www.MinimaLine.com (together or individually “Service”) operated by Drizzle.<br />
              Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.<br /><br />
              Your agreement with us includes these Terms and our Privacy Policy (“Agreements”). You acknowledge that you have read and understood Agreements, and agree to be bound by them.<br /><br />
              If you do not agree with Agreements, then you may not use the Service, but please let us know by emailing at dsbolivar@up.edu.ph so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.<br /><br />
              <h4>2. Content</h4><br />
              Content found on or through this Service are the property of Drizzle or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.<br /><br />
              <h4>3. Prohibited Uses</h4><br />
              You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:<br /><br />
              0.1. In any way that violates any applicable national or international law or regulation.<br />
              0.2. In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.<br />
              0.3. To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of Service, or which, as determined by us, may harm or offend Company or users of Service or expose them to liability.<br /><br />
              Additionally, you agree not to:<br /><br />
              0.1. Use any device, software, or routine that interferes with the proper working of Service.<br />
              0.2. Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.<br />
              0.3. Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service, the server on which Service is stored, or any server, computer, or database connected to Service.<br />
              0.4. Take any action that may damage or falsify Company rating.<br />
              0.5 Otherwise attempt to interfere with the proper working of Service.<br /><br />
              <h4>4. Accounts</h4><br />
              You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.<br /><br />
              <h4>5. Intellectual Property</h4><br />
              Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Drizzle and its licensors. Service is protected by copyright, trademark, and other laws of and foreign countries. Our trademarks may not be used in connection with any product or service without the prior written consent of Drizzle.<br /><br />
              <h4>6. Error Reporting and Feedback</h4><br />
              You may provide us either directly at dsbolivar@up.edu.ph or via third party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service (“Feedback”). You acknowledge and agree that: (i) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback; (ii) Company may have development ideas similar to the Feedback; (iii) Feedback does not contain confidential information or proprietary information from you or any third party.<br /><br />
              <h4>7. Changes To Service</h4><br />
              We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of Service, or the entire Service, to users, including registered users.<br /><br />
              <h4>8. Amendments To Terms</h4><br />
              We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.<br /><br />
              Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.<br /><br />
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.<br /><br />
              <h4>9. Acknowledgement</h4><br />
              BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.<br /><br />
              <h4>10. Contact Us</h4><br />
              Please send your feedback, comments, requests for technical support by email: dsbolivar@up.edu.ph.
            </h3>
        </Form>
    </Container>
    </Wrapper>
  );
};

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    margin-right: 50px;

    h2{
        color: #666666;
        margin-bottom: 1rem;
    }
    h3{
        color: #666666;
        margin-bottom: 1rem;
        font-weight: 60;
        font-size: 14px;
        padding-bottom: 50px;
    }
    h4{
        font-weight: bold;
    }

    button{
        width: 75%;
        max-width: 350px;
        min-width: 250px;
        height: 40px;
        border: none;
        margin: 1rem 0;
        box-shadow: 0px 14px 9px -15px rgba(0,0,0,0.25);
        border-radius: 8px;
        background-color: #70edb9;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in;
        
        &:hover{
            transform: translateY(-3px);
        }
    }

    input{
      margin: 0.7rem 0;
    }

    p{
      margin-top: 5px;
      color: #757575;
      font-weight: bold; 
   }
`;

const ArrowWrapper = styled.div`
  margin-top: 50px;
  margin-left: 30px;
  position: fixed;
  z-index: 2;

  .back{
    font-size: 40px;
    color: #666666;
  }
  .back:hover{
    color: #ec9736;
  }
`;
const Wrapper = styled.div`
`

const Container = styled.div`

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
 
  min-width: 600px;
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 0.5);
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  overflow: auto; 
  padding-left: 80px;

  @media (max-width: 900px){
      width: 100vw;
      position: absolute;
      padding: 0;
  }
`;



export default Terms;