const solution = (progresses, speeds) => {
    const featuresPerDeploy = [];

    let firstTaskIdx = 0;

    while (firstTaskIdx < progresses.length) {
        // 출시
        let numberOfDeployedFeatures = 0;
        while (
            firstTaskIdx < progresses.length &&
            progresses[firstTaskIdx] >= 100
        ) {
            numberOfDeployedFeatures++;
            firstTaskIdx++;
        }

        if (numberOfDeployedFeatures > 0) {
            featuresPerDeploy.push(numberOfDeployedFeatures);
        }

        // 하루 만큼 개발 진행
        for (let idx = firstTaskIdx; idx < progresses.length; idx++) {
            progresses[idx] += speeds[idx];
        }
    }

    return featuresPerDeploy;
};
