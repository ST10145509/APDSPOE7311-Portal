exports.getAccountData = async (req, res) => {
  console.log('getAccountData route hit');
  try {
    // Mock data for demonstration purposes
    const accountData = {
      balance: 0,
      transactions: [
        { date: '2024-10-07', description: 'Deposit', amount: 0 },
        { date: '2024-10-06', description: 'Withdrawal', amount: 0 },
        { date: '2024-10-05', description: 'Transfer', amount: -0 }
      ]
    };
    res.json(accountData);
  } catch (error) {
    console.error('Error fetching account data:', error);
    res.status(500).json({ message: 'Error fetching account data' });
  }
};
