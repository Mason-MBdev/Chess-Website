class ChessTimer {
    constructor(player1Time, player2Time, unlimitedTime) {
        this.player1Time = player1Time;
        this.player2Time = player2Time;
        this.currentPlayer = 2;
        this.timerId1 = null;
        this.timerId2 = null;
        this.unlimitedTime = unlimitedTime;
    }

    start(timerElement1, timerElement2) {
        if (!this.unlimitedTime) {
            if (this.currentPlayer === 1) {
                clearInterval(this.timerId2);
                this.timerId1 = setInterval(() => {
                    this.player1Time--;
                    if (this.player1Time === 0) {
                        clearInterval(this.timerId1);
                        alert('Time is up for Black team!');
                    }
                    this.updateTimerElement(timerElement1, timerElement2);
                }, 1000);
            } else {
                clearInterval(this.timerId1);
                this.timerId2 = setInterval(() => {
                    this.player2Time--;
                    if (this.player2Time === 0) {
                        clearInterval(this.timerId2);
                        alert('Time is up for white team!');
                    }
                    this.updateTimerElement(timerElement1, timerElement2);
                }, 1000);
            }
        }
    }

    switchPlayer(timerElement1, timerElement2) {
        if (!this.unlimitedTime) {
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            this.start(timerElement1, timerElement2);
            // flash the active timer of the current player
            if (this.currentPlayer === 1) {
                timerElement1.style.color = 'red';
                timerElement2.style.color = 'black';
            } else {
                timerElement1.style.color = 'black';
                timerElement2.style.color = 'red';
            }
        }
    }

    updateTimerElement(timerElement1, timerElement2) {
        if (!this.unlimitedTime) {
            const minutes1 = Math.floor(this.player1Time / 60);
            const seconds1 = this.player1Time % 60;
            timerElement1.textContent = `${minutes1}:${seconds1 < 10 ? '0' : ''}${seconds1}`;

            const minutes2 = Math.floor(this.player2Time / 60);
            const seconds2 = this.player2Time % 60;
            timerElement2.textContent = `${minutes2}:${seconds2 < 10 ? '0' : ''}${seconds2}`;
        }
    }
}