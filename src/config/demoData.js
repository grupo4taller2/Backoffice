export const MOCKING = true;

export const loginMockData = [{
    value: {
        "Federated": 345,
        "Email": 475
    }
}];

export const signupMockData = [{
    value: {
        "Federated": 125,
        "Email": 89
    }
}];

export const transactionMockData = {
    "payments": 25,
    "withdraws": 16
};

export const activeMockData = [
    {
        value: {
            "Rider": 100,
            "Driver": 89
        },
        time: "0Hrs"
    },
    {
        value: {
            "Rider": 120,
            "Driver": 100
        },
        time: "1Hrs"
    },
    {
        value: {
            "Rider": 80,
            "Driver": 100
        },
        time: "2Hrs"
    },
    {
        value: {
            "Rider": 67,
            "Driver": 120
        },
        time: "3Hrs"
    },
    {
        value: {
            "Rider": 89,
            "Driver": 90
        },
        time: "4Hrs"
    },
    {
        value: {
            "Rider": 25,
            "Driver": 75
        },
        time: "5Hrs"
    },
    {
        value: {
            "Rider": 55,
            "Driver": 50
        },
        time: "6Hrs"
    },
    {
        value: {
            "Rider": 75,
            "Driver": 45
        },
        time: "7Hrs"
    },
    {
        value: {
            "Rider": 100,
            "Driver": 50
        },
        time: "8Hrs"
    },
    {
        value: {
            "Rider": 120,
            "Driver": 90
        },
        time: "9Hrs"
    },
    {
        value: {
            "Rider": 100,
            "Driver": 120
        },
        time: "10Hrs"
    },
    {
        value: {
            "Rider": 140,
            "Driver": 160
        },
        time: "11Hrs"
    },
    {
        value: {
            "Rider": 170,
            "Driver": 200
        },
        time: "12Hrs"
    },
    {
        value: {
            "Rider": 150,
            "Driver": 210
        },
        time: "13Hrs"
    },
    {
        value: {
            "Rider": 170,
            "Driver": 180
        },
        time: "14Hrs"
    },
    {
        value: {
            "Rider": 150,
            "Driver": 140
        },
        time: "15Hrs"
    },
    {
        value: {
            "Rider": 125,
            "Driver": 150
        },
        time: "16Hrs"
    },
    {
        value: {
            "Rider": 130,
            "Driver": 125
        },
        time: "17Hrs"
    },
    {
        value: {
            "Rider": 160,
            "Driver": 100
        },
        time: "18Hrs"
    },
    {
        value: {
            "Rider": 125,
            "Driver": 125
        },
        time: "19Hrs"
    },
    {
        value: {
            "Rider": 115,
            "Driver": 125
        },
        time: "20Hrs"
    },
    {
        value: {
            "Rider": 100,
            "Driver": 130
        },
        time: "21Hrs"
    },
    {
        value: {
            "Rider": 110,
            "Driver": 120
        },
        time: "22Hrs"
    },
    {
        value: {
            "Rider": 111,
            "Driver": 100
        },
        time: "23Hrs"
    },
    
]

export function getMockedData(mocked){
    switch (mocked){
        case "logins": return loginMockData;
        case "signup": return signupMockData;
        case "active": return activeMockData;
    }
}

export const  DriverTripMockedData = [
    {
        drivers: 120,
        trips: "<3"
    },
    {
        drivers: 89,
        trips: "<9"
    },
    {
        drivers: 150,
        trips: ">9"
    }

];

export const  RiderTripMockedData = [
    {
        users: 200,
        trips: "<3"
    },
    {
        users: 100,
        trips: "<9"
    },
    {
        users: 49,
        trips: ">9"
    }
];

export const  TripDistanceMockedData = [
    {
        length: "<5",
        value: 100
    },
    {
        length: "<10",
        value: 150
    },
    {
        length: ">10",
        value: 99
    }
];
