'use client'
import React from 'react'
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
    const handleClick = () => {
        const dialogElement = document.getElementById('my_modal_2') as HTMLDialogElement;
        if (dialogElement) {
          dialogElement.showModal();
        } else {
          console.error('Dialog element not found');
        }
      };
    
      return (
        <div>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg">Settings</h3>
              <p className="py-4">Press ESC key or click on ✕ button to close</p>
            </div>
          </dialog>
          <SettingsIcon onClick={handleClick} />
        </div>
      );
}

export default Settings