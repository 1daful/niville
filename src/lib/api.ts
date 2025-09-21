'use server';

// This is a mock API to simulate fetching data for the dashboard.
// In a real application, you would replace this with actual API calls to your backend.

const MOCK_DATA = {
    summary: {
        totalSpending: 45231.89,
        spendingChange: 20.1,
        totalTransactions: 23,
        transactionChange: 12,
        servicesUsedCount: 4,
        services: 'Data, Airtime, Utility, Cable',
    },
    spendingChart: [
        { month: 'Jan', spending: 18600 },
        { month: 'Feb', spending: 30500 },
        { month: 'Mar', spending: 23700 },
        { month: 'Apr', spending: 27300 },
        { month: 'May', spending: 20900 },
        { month: 'Jun', spending: 21400 },
    ],
    recentTransactions: [
        {
            service: 'Data Purchase',
            provider: 'MTN',
            amount: 2500.00,
            date: '2024-07-22',
        },
        {
            service: 'Utility Payment',
            provider: 'EKEDC',
            amount: 15000.00,
            date: '2024-07-20',
        },
        {
            service: 'Airtime Top-up',
            provider: 'Airtel',
            amount: 1000.00,
            date: '2024-07-19',
        },
        {
            service: 'Cable TV Subscription',
            provider: 'DSTV',
            amount: 7500.00,
            date: '2024-07-18',
        },
    ]
};

const SIMULATED_DELAY = 1000; // 1 second

export async function getDashboardData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_DATA);
        }, SIMULATED_DELAY);
    });
}
