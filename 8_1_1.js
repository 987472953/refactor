// 将calculateDistance移动到顶层 => 能单独计算距离而不依赖汇总报告
function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;
    return {
        time: totalTime,
        distance: totalDistance,
        pace: pace
    };
    function calculateDistance() {
        let result = 0;
        for (let i = 1; i < points.length; i++) {
            result += distance(points[i - 1], points[i]);
        }
        return result;
    }
    function distance(p1, p2) {
        // ... 
    }
    function radians(degrees) {
        // ... 
    }
    function calculateTime() {
        // ... 
    }
}


// 1 copy到到最外层
function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;
    return {
        time: totalTime,
        distance: totalDistance,
        pace: pace
    };
    function calculateDistance() {
        let result = 0;
        for (let i = 1; i < points.length; i++) {
            result += distance(points[i - 1], points[i]);
        }
        return result;
    }
    // ...
    function distance(p1, p2) {
        //... 
    }
    function radians(degrees) {
        // ... 
    }
    function calculateTime() {
        // ... 
    }
}
function top_calculateDistance() {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
    }
    return result;
}

// 2 将之前使用的参数进行传递(distance 这时不存在)
function top_calculateDistance(points) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
    }
    return result;
}

// 3 将distance 与 radians 搬移到原来的 calculateDistance 方法内 (保证测试)
function distance(p1, p2) {
    const EARTH_RADIUS = 3959; // in miles
    const dLat = radians(p2.lat) - radians(p1.lat);
    const dLon = radians(p2.lon) - radians(p1.lon);
    const a = Math.pow(Math.sin(dLat / 2), 2)
        + Math.cos(radians(p2.lat))
        * Math.cos(radians(p1.lat))
        * Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c;
}
function radians(degrees) {
    return degrees * Math.PI / 180;
}

function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;
    return {
        time: totalTime,
        distance: totalDistance,
        pace: pace
    };
    function calculateDistance() {
        let result = 0;
        for (let i = 1; i < points.length; i++) {
            result += distance(points[i - 1], points[i]);
        }
        return result;
        function distance(p1, p2) {
            // ... 
        }
        function radians(degrees) {
            // ... 
        }
    }
}

// 4 测试过后将 distance 与 radians 移到外层 top_calculateDistance
function top_calculateDistance(points) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
    }
    return result;
    function distance(p1, p2) {
        // ... 
    }
    function radians(degrees) {
        // ...
    }
}

// 5 内部调用外层 top_calculateDistance
function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;
    return {
        time: totalTime,
        distance: totalDistance,
        pace: pace
    };
    function calculateDistance() {
        return top_calculateDistance(points);
    }
}

// 6 删除内部 calculateDistance
function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = top_calculateDistance(points);
    const pace = totalTime / 60 / totalDistance;
    return {
        time: totalTime,
        distance: totalDistance,
        pace: pace
    };
}

// 7 改名
function trackSummary(points) {
    const totalTime = calculateTime();
    const pace = totalTime / 60 / totalDistance(points);
    return {
        time: totalTime,
        distance: totalDistance(points),
        pace: pace
    };
}
function totalDistance(points) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
    }
    return result;
}

// 8 最终效果
function trackSummary(points) {
    // ...
}
function totalDistance(points) {
    // ...
}
function distance(p1, p2) {
    // ...
}
function radians(degrees) {
    // ...
}
