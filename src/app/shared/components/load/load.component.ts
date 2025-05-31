import { Component } from '@angular/core';

@Component({
  selector: 'app-load',
  standalone: true,
  imports: [],
  template: `
    <main class="load-main">
      <section class="load-dot">
        <div class="dot-element"></div>
        <div class="dot-element"></div>
        <div class="dot-element"></div>
      </section>
    </main>
  `,
  styles: [
    `
      .load-main {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3.5em;
        background-color: #fff;
      }

      .load-main .load-dot {
        display: flex;
        gap: 20px;
      }

      .load-main .dot-element {
        width: 30px;
        height: 30px;
        background-color: #0c6369;
        clip-path: circle();
        transition: 0.4s;
      }

      .load-main .dot-element:nth-child(1) {
        animation: up-down-load-dot-1 1s infinite;
      }

      .load-main .dot-element:nth-child(2) {
        animation: up-down-load-dot-2 1s infinite;
        animation-delay: 0.2s;
      }

      .load-main .dot-element:nth-child(3) {
        animation: up-down-load-dot-3 1s infinite;
        animation-delay: 0.4s;
      }

      @keyframes up-down-load-dot-1 {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-40px);
        }
      }

      @keyframes up-down-load-dot-2 {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-40px);
        }
      }

      @keyframes up-down-load-dot-3 {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-40px);
        }
      }
    `,
  ],
})
export class LoadComponent {}
