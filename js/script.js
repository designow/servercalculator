        'use strict';
        (function () {
            window.onload = function(){
            var getSelector = function (name) {
                return document.querySelector(name);
            }

            var LICENSE_TYPE = [16, 24];
            var EXT_LICENSE_TYPE = [16, 4, 2];
            var EXT_LICENSE_COUNT = [0, 0, 0];
            var processors = getSelector('#processors');
            var cores = getSelector('#cores');
            var totalCores = getSelector('#total-cores');
            var license16 = getSelector('#license-16');
            var license24 = getSelector('#license-24');
            var extCores = getSelector('#ext-cores');
            var extlicense16 = getSelector('#ext-license-16');
            var extCoresCount = 0;
            var GREEN_STYLE = 'win-server__number--green';
            //Валидация полей ввода ядер ... разрешен ввод только цифр
            var validation = function (input) {
                input.value = input.value.replace(/[^\d]/g,'');
                if(input.value <= 0) {input.value = 1;}
            }
            
            processors.addEventListener("keyup", function(){
                validation(processors);
            }
            );

            cores.addEventListener("keyup", function(){
                validation(cores);
            }
            );

            //Расчет количества ядер в процессорах
            var totalCoresCalculator = function (processors, cores) {
                return processors * cores;
            }
            //Выбор типа основной лицензии
            var licenseType = function (cores, type1, type2, extCores) {
                var licenseType = 0;
                extCores.textContent = 0;
                if (cores <= LICENSE_TYPE[0]) {
                    type1.textContent = 1;
                    type1.classList.add(GREEN_STYLE);
                    type2.textContent = 0;
                    type2.classList.remove(GREEN_STYLE);
                    if (cores - LICENSE_TYPE[0] > 0) {
                        licenseType = LICENSE_TYPE[0];
                    }
                } else {
                    type1.textContent = 0;
                    type1.classList.remove(GREEN_STYLE);
                    type2.textContent = 1;
                    type2.classList.add(GREEN_STYLE);
                    if (cores - LICENSE_TYPE[1] > 0) {
                        licenseType = LICENSE_TYPE[1];
                    }
                }
                if (licenseType) {
                    extCores.classList.add(GREEN_STYLE);
                    return cores - licenseType;
                }else{
                    extCores.classList.remove(GREEN_STYLE);
                }

            }
            //Расчет количества дополнительных лицензий
            var extLicenseCount = function (cores, count) {
                var licenseCount = 0;
                while (cores >= 0) {
                    cores = cores - count;
                    if (cores >= 0) {
                        licenseCount++;
                    }
                }
                return licenseCount;
            }

            var extLicense = function () {
                var licenseAccumulator = 0;
                for (var i = 0; i < EXT_LICENSE_TYPE.length; i++) {
                    var extLicenseSpan = getSelector('#ext-license-' +
                        i);
                        extLicenseSpan.classList.remove(GREEN_STYLE);
                    extCoresCount = extCoresCount - licenseAccumulator;
                    EXT_LICENSE_COUNT[i] = extLicenseCount(extCoresCount, EXT_LICENSE_TYPE[i]);
                    extLicenseSpan.textContent = EXT_LICENSE_COUNT[i];
                    if(EXT_LICENSE_COUNT[i]){
                    extLicenseSpan.classList.add(GREEN_STYLE);
                    }
                    licenseAccumulator = licenseAccumulator + (EXT_LICENSE_COUNT[i] *
                        EXT_LICENSE_TYPE[i]);
                }
            }

            processors.addEventListener('input', function () {
                totalCores.textContent = totalCoresCalculator(processors.value, cores.value);
                extCoresCount = licenseType(totalCores.textContent, license16, license24, extCores);
                if (extCoresCount) {
                    extCores.textContent = extCoresCount;
                }
                extLicense();
            });

            cores.addEventListener('input', function () {
                totalCores.textContent = totalCoresCalculator(processors.value, cores.value);
                extCoresCount = licenseType(totalCores.textContent, license16, license24, extCores);
                if (extCoresCount) {
                    extCores.textContent = extCoresCount;
                }
                extLicense();
            });


        }})();
    