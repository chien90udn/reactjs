import React from 'react';
import Modal from 'react-overlays/lib/Modal';


export default ( props ) => (
    <Modal className="modal" style={{
                display: ( props.hide ? 'none' : 'block' ),
                backgroundColor: 'rgba(255,255,255,0.0)'
            }} show={ !props.hide }>
        <div style={{ width: "100%", height: "100%", textAlign: "center", paddingTop: '40vh' }}>
            <span className="fa fa-spin fa-refresh" style={{ fontSize: "5rem", color: "#8ae" }}></span>
        </div>
    </Modal>
);