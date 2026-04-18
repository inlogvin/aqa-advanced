import chalk from 'chalk';

console.log(chalk.red('Red') + ', ' + chalk.bgRgb(255, 165, 0)('orange')+ ', ' + chalk.bgYellow('yellow') + ', ' + chalk.green('gren'));
console.log(chalk.blue('Blue') + ' and ' + chalk.bgRgb(75, 0, 130)('indigo') + ' in between');
console.log(chalk.bgRgb(238, 130, 238)('Violet') + ' shines so bright and true,');
console.log('A rainbow made for me and you!')