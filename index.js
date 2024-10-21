


class SwissBank {
    constructor() {
        this.users = [
            
             { name: 'Nanfwang', 
              accountNumber: 1001, 
              balance: 5000, 
              loan: 0 
            },
            
            { name: 'Sarah', 
              accountNumber: 1002, 
              balance: 8000, 
              loan: 0 
            },
            
            { name: 'Joshua', 
              accountNumber: 1003, 
              balance: 3000, 
              loan: 0 
            }
        ];
    }

    // Find user by account number
    findUser(accountNumber) {
        return this.users.find(user => user.accountNumber === accountNumber);
    }

    // Deposit money into account
    deposit(accountNumber, amount) {
        const user = this.findUser(accountNumber);
        if (user) {
            user.balance += amount;
            return `Deposit successful. ${user.name}'s new balance: $${user.balance}`;
        } else {
            return `Account number ${accountNumber} do not have an account.`;
        }
    }

    // Transfer money from one user to another
    transfer(fromAccountNumber, toAccountNumber, amount) {
        const fromUser = this.findUser(fromAccountNumber);
        const toUser = this.findUser(toAccountNumber);

        if (!fromUser) return `Sender account ${fromAccountNumber} do not have an account.`;
        if (!toUser) return `Recipient account ${toAccountNumber} do not have an account.`;

        if (fromUser.balance >= amount) {
            fromUser.balance -= amount;
            toUser.balance += amount;
            return `Transfer successful. ${fromUser.name} transferred #${amount} to ${toUser.name}.`;
        } else {
            return `Insufficient funds in ${fromUser.name}'s account.`;
        }
    }

    // Request loan
    requestLoan(accountNumber, amount) {
        const user = this.findUser(accountNumber);
        if (user) {
            user.loan += amount;
            return `${user.name} requested a loan of #${amount}. Loan approved. Total loan: #${user.loan}`;
        } else {
            return `Account number ${accountNumber} do not have an account!. Loan request denied. please create an account`;
        }
    }

    // Check account balance
    checkBalance(accountNumber) {
        const user = this.findUser(accountNumber);
        if (user) {
            return `${user.name}'s account balance: #${user.balance}`;
        } else {
            return `Account number ${accountNumber} do not have an account.`;
        }
    }
}

// Initialize the bank
const swissBank = new SwissBank();

// submissions for different operations
document.getElementById('bankForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const accountNumber = parseInt(document.getElementById('accountNumber').value);
    const operation = document.getElementById('operation').value;
    const amount = parseFloat(document.getElementById('amount').value);
    let result;

    switch (operation) {
        case 'deposit':
            result = swissBank.deposit(accountNumber, amount);
            break;
        case 'transfer':
            const toAccountNumber = parseInt(prompt('Enter recipient account number:'));
            result = swissBank.transfer(accountNumber, toAccountNumber, amount);
            break;
        case 'loan':
            result = swissBank.requestLoan(accountNumber, amount);
            break;
        case 'balance':
            result = swissBank.checkBalance(accountNumber);
            break;
        default:
            result = 'Invalid operation';
    }

    displayOutput(result);
});

//display the output
function displayOutput(message) {
    document.getElementById('output').innerHTML = `<p>${message}</p>`;
}

