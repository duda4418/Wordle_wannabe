'use client'
import React from 'react'
import { BarChartBig } from 'lucide-react';

const Stats = () => {
    const handleClick = () => {
        const dialogElement = document.getElementById('my_modal_1') as HTMLDialogElement;
        if (dialogElement) {
          dialogElement.showModal();
        } else {
          console.error('Dialog element not found');
        }
      };
    
      return (
        <div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg">Stats</h3>
              <p className="py-4">Press ESC key or click on ✕ button to close</p>
            </div>
          </dialog>
          <BarChartBig onClick={handleClick} />
        </div>
      );
}

export default Stats