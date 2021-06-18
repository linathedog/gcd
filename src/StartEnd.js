import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
export const Start = (props)=> {
  let history = useHistory();
  return(

    <div className="main-container">
      <Row>
        <Col md="auto" className="description-row narrow ">
          <Row>
          <h2>Καλος Ηρθατε!</h2>
          {/*<Button  onClick={()=>{shufleAlg();}}>Ανακάτεμα</Button>*/}
          </Row>
          <Row>
            <p>
              Αυτό το διδακτικό αντικείμενο έχει ως στόχο την υποστίρηξη εκμάθησης αλγοριθμων εύρεσης Μέγιστου κοινού διαιρέτη. Μέγιστος κοινός διαιρέτης στη θεωρία αριθμών ονομάζεται ο μεγαλύτερος ακέραιος που διαιρεί δύο ή περισσότερους ακέραιους αριθμούς. Ο μέγιστος κοινός διαιρέτης των a και b συμβολίζεται με ΜΚΔ ( a , b ) ή gcd( a, b ) ή απλούστερα ( a , b ).
            </p>
          </Row>
          <Row>
              <div className="challenge-container">
                <div className='challenge-question'>
                  <span>Αν είστε έτοιμοι να ξεκινήσετε πατήστε το κουμπί Εκκίνηση</span>
                </div>
                  <div className='challenge-input-container'>
                    <Row >
                      <Col className="controls-container">
                        <div>
                          <div className="button-container">
                            <div className="button-container-inner">
                              <Button variany='success' onClick={()=>{history.push('/alg');}}>Εκκίνηση</Button>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>

                  </div>

              </div>
            </Row>

            </Col>
      </Row>
    </div>
  );
}

export const End = (props)=> {
  let history = useHistory();
  return(
    <div className="main-container">
      <Row>
        <Col md="auto" className="description-row narrow">
          <Row>
          <h2> Συγχαρητήρια Φτάσατε στο Τέλος!</h2>
          {/*<Button  onClick={()=>{shufleAlg();}}>Ανακάτεμα</Button>*/}
          </Row>
          <Row>
              <div className="challenge-container">
                <div className='challenge-question'>
                  <span>Για να ξεκινήσετε ξανά από την αρχή χρησιμοποιήστε το κουμπί Εκκίνηση Ξανά</span>
                </div>
                  <div className='challenge-input-container'>
                    <Row >
                      <Col className="controls-container">
                        <div>
                          <div className="button-container">
                            <div className="button-container-inner">
                              <Button variany='success' onClick={()=>{history.push('/alg');}}>Εκκίνηση Ξανά</Button>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>

                  </div>

              </div>
            </Row>

            </Col>
      </Row>
    </div>
  );
}
