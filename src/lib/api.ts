'use server';

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit, doc, addDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth } from '@/lib/firebase';

// This file simulates fetching data and now also interacts with Firestore.

// MOCK DATA for summary and chart - we can move this to Firestore later if needed.
const MOCK_SUMMARY = {
    totalSpending: 45231.89,
    spendingChange: 20.1,
    totalTransactions: 23,
    transactionChange: 12,
    servicesUsedCount: 4,
    services: 'Data, Airtime, Utility, Cable',
};

const MOCK_CHART_DATA = [
    { month: 'Jan', spending: 18600 },
    { month: 'Feb', spending: 30500 },
    { month: 'Mar', spending: 23700 },
    { month: 'Apr', spending: 27300 },
    { month: 'May', spending: 20900 },
    { month: 'Jun', spending: 21400 },
];

const SIMULATED_DELAY = 500;

export async function getDashboardData() {
    const user = auth.currentUser;
    if (!user) {
        // Return mock data if user is not logged in, or throw an error
        // For this app, we'll assume dashboard is only for logged-in users
        // and the page itself will handle redirection.
        return {
            summary: MOCK_SUMMARY,
            spendingChart: MOCK_CHART_DATA,
            recentTransactions: [],
        }
    }
    
    // Fetch recent transactions from Firestore
    const transactionsQuery = query(
        collection(db, 'transactions'),
        where('userId', '==', user.uid),
        orderBy('date', 'desc'),
        limit(5)
    );

    const querySnapshot = await getDocs(transactionsQuery);
    const recentTransactions = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            service: data.service,
            provider: data.provider,
            amount: data.amount,
            // Convert Firestore Timestamp to a readable date string
            date: data.date.toDate().toLocaleDateString('en-CA'),
        };
    });
    
    // You could also calculate summary data from transactions here
    // For now, we'll keep using mock summary and chart data.

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                summary: MOCK_SUMMARY,
                spendingChart: MOCK_CHART_DATA,
                recentTransactions,
            });
        }, SIMULATED_DELAY);
    });
}

export async function saveTransaction(transactionData: {
    title: string;
    identifier: string;
    amount: number;
}) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("User not authenticated");
    }

    await addDoc(collection(db, 'transactions'), {
        userId: user.uid,
        service: transactionData.title,
        provider: transactionData.identifier, // Using identifier as provider for simplicity
        amount: transactionData.amount,
        date: serverTimestamp(),
    });
}
