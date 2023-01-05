let process = {

    func: $.extend({}, app),

    init: function () {
        processed_category = false;
        processed_final = false;
        $.getJSON(`${base_url}/topic_label.json`, function(data) {
            hitwords = data;
        });
        process.setItems();
        process.createCategories();
        process.checkCategory();
        process.processedChange();
        process.viewDefaultStopWords();
        process.filterStopWords();
        process.addStopWords();
        process.createNewStopWords();
        process.uploadStopWords();
        process.downloadCleanData();
        process.showEnumerations();
        process.uploadProcessedData();
        process.topicLabeling();
        process.modalLabelList();
    },
    processedChange: function () {
        $('#processAnalysis').on('change', '.process-input', function () {
            processed_final = false;
        });
    },
    setItems: function () {
        $('#processAnalysis').smartWizard({
            theme: 'arrows',
            toolbarSettings: {
                toolbarExtraButtons: [
                    // $('<button></button>').text('Publish WordCloud')
                    //     .addClass('btn btn-info btn-flat publish-word-cloud d-none')
                    //     .on('click', function(){
                    //         let formData = new FormData();
                    //         formData.append('processed_ids', JSON.stringify(processed_ids));
                    //         app.ajax_upload(`${api_url}/v1/management/answers/publish-data`, 'post', formData, false, true,function (response) {
                    //             swal("Done!", "It was successfully published!", "success");
                    //         });
                    //     }),
                    $('<button></button>').text('Finish')
                        .addClass('btn btn-info d-none')
                        .on('click', function(){
                            // alert('Finish button click');
                        }),
                    $('<button></button>').text('Cancel')
                        .addClass('btn btn-danger d-none')
                        .on('click', function(){
                            // alert('Cancel button click');
                        })
                ]
            },
        }).on("showStep", function(e, anchorObject, stepNumber, stepDirection) {
            $('.sw-btn-group-extra').hide();
            if (stepNumber === 3) {
                $('.sw-btn-group-extra').show();
                $('.sw-btn-group-extra .publish-word-cloud').show();
            }
            if (stepNumber === 2) {
                if (processed_final) {
                    return false;
                }
                $('.thematic-analysis-table').html('');
                $('.word-cloud').html('');
                $('.lda-frames').html('');
                let options = {
                    "remove_symbols": $('input[name="remove_symbols"]').is(":checked") ? 1 : 0,
                    "remove_numbers": $('input[name="remove_numbers"]').is(":checked") ? 1 : 0,
                    "remove_duplicates": $('input[name="remove_duplicates"]').is(":checked") ? 1 : 0,
                };
                let settings = {
                    "number_topics": $('input[name="number_topics"]').val(),
                    "number_iterations": $('input[name="number_iterations"]').val(),
                    "number_words": $('input[name="number_words"]').val(),
                    "optimization_interval": $('input[name="optimization_interval"]').val(),
                    "model_name": $('input[name="model_name"]').val(),
                };

                let i = 1;
                let time = 0;
                let DRRM = 'drrm_strategies';
                let element = $('input[name="category"]');
                let dataCat = $('input[name="data_category"]:checked');
                let elementChecked = $('input[name="category"]:checked');
                let dC = false;
                if (dataCat.val() !== DRRM) {
                    element = $('input[name="data_category"]');
                    elementChecked = dataCat;
                    dC = true;
                }
                processed_ids = [];
                $.each(element, function (key, val) {
                    if ($(this).is(':checked')) {
                        let header = $(this).val();
                        if (header === "upload_processed_data") {
                            header = "Uploaded Data";
                        }
                        let formData = new FormData();
                        formData.append('data_category', $('input[name="data_category"]:checked').val());
                        if (!dC)
                            formData.append('category', JSON.stringify($(this).val()));
                        formData.append('options', JSON.stringify(options));
                        formData.append('stop_words', current_stop_words.join(","));
                        if ($('input[name="upload_processed_data_file"]')[0].files[0] !== undefined)
                            formData.append(
                                'upload_processed_data_file',
                                $('input[name="upload_processed_data_file"]')[0].files[0]
                            );
                        formData.append('settings', JSON.stringify(settings));
                        formData.append('title', header);
                        setTimeout(function () {
                            app.ajax_upload(`${base_url}/management/answers/summary/1`, 'post', formData, false, true,function (response) {
                                // app.ajax_upload(`${base_url}/management/analysis/perform-lda`, 'post', formData, true, true,function (response) {

                                // });
                                let elementId = Math.random().toString(36).substring(5);
                                let html = `
                                <div class="card-header pt-5">
                                    <h3>${header}</h3>
                                </div>
                                <table class="dataTable table table-responsive table-hover ">
                                    <thead>
                                    <tr>
                                        <th>Topic #</th>
                                        <th>Topic labels</th>
                                        <th>Parameter</th>
                                        <th>Topic Models</th>
                                        <th class="label-topic-paa" style="display: none;">Goal</th>
                                        <th class="label-topic-ched" style="display: none;">System Integration</th>
                                        <th class="label-topic-ched" style="display: none;">Application Development</th>
                                        <th class="label-topic-ched" style="text-align: left !important; display: none;">Software Engineering</th>
                                    </tr>
                                    </thead>
                                    <tbody class="${elementId}">`;
                                $.each(response.thematics_analysis, function (index, value) {
                                    html += `
                                        <tr>
                                            <td>${index}</td>
                                            <td><input type="text" name="topic_label[]" class="topic_label"></td>
                                            <td>${value.params}</td>
                                            <td>${value.words.join(", ")}</td>
                                            <td class="label-topic-paa" style="display: none;"></td>
                                            <td class="label-topic-ched" style="display: none;"></td>
                                            <td class="label-topic-ched" style="display: none;"></td>
                                            <td class="label-topic-ched" style="display: none;"></td>
                                        </tr>
                                    `;
                                });
                                html +=`
                                    </tbody>
                                </table>
                                `;
                                $('.thematic-analysis-table').append(html);
                                let cloudHtml = `
                                    <div class="col-lg-12 pt-5">
                                            <div class="card-header">
                                                <h3>Word Cloud Visualization (${header})</h3>
                                            </div>
                                            <div class="card-body">
                                                <div class="col-lg-12 cloud-${i}" style="width: 70vw; height: 50vh;">
                                                </div>
                                            </div>
                                    </div>
                                `;
                                processed_ids.push(response.processed_id);
                                $('.word-cloud').show().append(cloudHtml);
                                if (response.cloud !== undefined) {
                                    $(`.cloud-${i}`).jQCloud(response.cloud, {
                                        autoResize: true,
                                        afterCloudRender: function () {
                                            try {
                                                if (elementChecked.length == (i-1)) {
                                                    setTimeout(function () {
                                                        $('.word-cloud').attr("style", "display: none");
                                                    }, 2000);
                                                }
                                            } catch (e) {
                                                setTimeout(function () {
                                                    $('.word-cloud').attr("style", "display: none");
                                                }, 2000);
                                            }
                                        }
                                    });
                                }
                                let url = `${root_url}/lda/data/${response.model_name}/lda.html`;
                                app.ajax_loader(
                                    `${base_url}/management/analysis/visualize?url=${url}&model_name=${response.model_name}`,
                                    'get',
                                    null,
                                    function (data) {
                                        let rand = Math.random().toString(36).substr(2, 5);
                                        let rand_class = `lda-frame-${rand}`;
                                        $('.lda-frames').append(`
                                                <h3>LDAvis Visualization for ${header}</h3>
                                                ${data.content}
                                            `);
                                        $(`.${rand_class}`).load(function () {

                                        }).error(function () {
                                            $(`.${rand_class}`).contentWindow.location.reload();
                                        });
                                        process.pyLDAVis(data.pyldavis, elementId, settings.number_words, header);
                                        processed_final = true;
                                    });

                                try {
                                    if (elementChecked.length == i) {
                                        // setTimeout(function () {
                                        //     app.removeLoader();
                                        // }, 2000);
                                        processed_final = true;
                                    }
                                } catch (e) {
                                    // setTimeout(function () {
                                    //     app.removeLoader();
                                    // }, 2000);
                                    processed_final = true;
                                }
                                i++;
                            });
                        }, time);
                        time += 1000;
                    }
                });
            } else if (stepNumber === 3) {
                if (processed_ids[0] !== undefined) {
                    let html = $('.thematic-analysis-table').html();
                    let data = {
                        thematic_analysis: html
                    };
                    app.ajax_loader(`${api_url}/v1/management/published/${processed_ids[0]}`, 'post', data, function (response) {
                    });
                }
            } else if (stepNumber === 4) {

                // if (processed_final) {
                //     return false;
                // }
                // let options = {
                //     "remove_symbols": $('input[name="remove_symbols"]').is(":checked") ? 1 : 0,
                //     "remove_numbers": $('input[name="remove_numbers"]').is(":checked") ? 1 : 0,
                //     "remove_duplicates": $('input[name="remove_duplicates"]').is(":checked") ? 1 : 0,
                // };
                // let settings = {
                //     "number_topics": $('input[name="number_topics"]').val(),
                //     "number_iterations": $('input[name="number_iterations"]').val(),
                //     "number_words": $('input[name="number_words"]').val(),
                //     "optimization_interval": $('input[name="optimization_interval"]').val(),
                //     "model_name": $('input[name="model_name"]').val(),
                // };
                // let formData = new FormData();
                // formData.append('options', JSON.stringify(options));
                // formData.append('settings', JSON.stringify(settings));
                // formData.append('stop_words', $('textarea[name="stop_words"]').val());
                // if ($('input[name="stop_words_file"]')[0].files[0] !== undefined)
                //     formData.append('stop_words_file', $('input[name="stop_words_file"]')[0].files[0]);
                // app.ajax_upload(`${base_url}/management/analysis/perform-lda`, 'post', formData, true, true,function (response) {
                //     // if (response.cloud !== undefined) {
                //     //     $(`.cloud-final`).jQCloud(response.cloud, {
                //     //         autoResize: true
                //     //     });
                //     // }
                //     let url = `http://159.89.193.192/lda/jenLDA/${response.lda}/lda.html`;
                //     $("#lda-frame").attr("src", url);
                //     process.loadLDA();
                //     processed_final = true;
                // });
            }
            // if($('button.sw-btn-next').hasClass('disabled')){
            //     $('.sw-btn-group-extra').show(); // show the button extra only in the last page
            // }else{
            //     $('.sw-btn-group-extra').hide();
            // }
        });
        $('.sw-btn-group-extra').hide();
    },

    checkCategory: function () {
        $('#processAnalysis').on('click', '.card-x', function () {
            let DRRM = 'drrm_strategies';
            let checkbox = $(this).find('input[type="checkbox"]');
            let radio = $(this).find('input[type="radio"]');

            if (checkbox.length) {
                if (checkbox.is(':checked')) {
                    checkbox.prop('checked', false);
                    processed_final = false;
                } else {
                    if (!$(this).hasClass("card-disabled")) {
                        checkbox.prop('checked', true);
                    }
                }
            } else if (radio.length) {
                if (radio.is(':checked')) {
                    radio.prop('checked', false);
                    processed_final = false;
                } else {
                    radio.prop('checked', true);
                    if (radio.val() === DRRM ) {
                        $('.card-categories .card-disabled').removeClass("card-disabled");
                    } else if (radio.val() === 'upload_processed_data') {
                        $("input[name='upload_processed_data_file']").trigger('click');
                    } else {
                        $('.card-categories .card-x').each(function () {
                            $(this).addClass("card-disabled");
                            $(this).find('input[type="checkbox"]').prop("checked", false);
                            processed_final = false;
                        })
                    }
                }
            }
        });
    },

    createCategories: function () {
        app.ajax_loader(`${api_url}/v1/management/question/1`, 'get', null, function (data) {
            let html = '';
            let defaultCategories = {
                'children': 'Children (under 18yrs old)',
                'youth': 'Youth (18-25 yrs old)',
                'elderly': 'Elderly (60 & above)',
                'pwd': 'Person with Disability (PWD)',
            };
            try {
                $.each(data.inputs[4].select_options, function (key, val) {
                    if (isNaN(key)) {
                        throw "";
                    }
                    let k = ++key;
                    html += `
                            <div class="col-lg-4 card-categories">
                                <div class="card-x card-disabled" data-id="${k}">
                                    <div class="question-check">
                                        <div class="round-x">
                                            <input type="checkbox" name="category" class="process-input"
                                                id="checkbox-${k}" value="${val.value}"/>
                                            <label for="checkbox-${k}"></label>
                                        </div>
                                    </div>
                                    <div class="card-body-x">
                                        <h3 class="card-title-x">${val.label}</h3>
                                    </div>
                                </div>
                            </div>
                        `;
                });
            } catch (e) {
                let k = 1;
                $.each(defaultCategories, function (key, val) {
                    html += `
                            <div class="col-lg-4 card-categories">
                                <div class="card-x card-disabled" data-id="${k}">
                                    <div class="question-check">
                                        <div class="round-x">
                                            <input type="checkbox" name="category" class="process-input"
                                                id="checkbox-${k}" value="${val}"/>
                                            <label for="checkbox-${k}"></label>
                                        </div>
                                    </div>
                                    <div class="card-body-x">
                                        <h3 class="card-title-x">${val}</h3>
                                    </div>
                                </div>
                            </div>
                        `;
                    k++;
                });
            }
            $('#step-1 .data-categories .col-lg-12').append(html);
        });
    },
    viewDefaultStopWords: function () {
        $.each(STOP_WORDS, function (k, val) {
            $('#defaultStopWords .sw-added-words .sw-words').append(`
                <div class="sw-added-word">${val}</div>
            `);
        });
    },
    filterStopWords: function () {
        $('.sw-added-words .sw-added-words-label').on('click', function () {
            let el = $(this).find('i');
            let container = $(this).parent().find('.sw-words');
            let alphabeticallyOrderedDivs = '';
            if (el.hasClass("fa-caret-up")) {
                el.removeClass("fa-caret-up").addClass("fa-caret-down");
                alphabeticallyOrderedDivs = container.find('.sw-added-word').sort(function(a, b) {
                    return String.prototype.localeCompare.call(
                        $(a).text().toLowerCase(),
                        $(b).text().toLowerCase()
                    );
                });
            } else {
                el.addClass("fa-caret-up").removeClass("fa-caret-down");
                alphabeticallyOrderedDivs = container.find('.sw-added-word').sort(function(a, b) {
                    return String.prototype.localeCompare.call(
                        $(b).text().toLowerCase(),
                        $(a).text().toLowerCase()
                    );
                });
            }

            container.html('').append(alphabeticallyOrderedDivs);
        });
    },
    addStopWords: function () {
        $('.sw-add').on('click', function () {
            let el = $('textarea[name="stop_words"]');
            let addedStopWords = el.val().split(",");
            process.appendStopWords(addedStopWords);
            el.val('');
        });
        $(document).on('mouseenter ', '.sw-added-word.dynamic', function() {
            $(this).append(`<div class="sw-delete-added-word">DELETE</div>`);
        }).on('mouseleave ', '.sw-added-word.dynamic', function() {
            $(this).find('.sw-delete-added-word').remove();
        });
        $(document).on('click', '.sw-added-word .sw-delete-added-word', function () {
            let parent = $(this).parent();
            let val = parent.find('span').text();
            current_stop_words.splice( $.inArray(val, current_stop_words), 1 );
            parent.remove();
        });
    },
    appendStopWords: function (addedStopWords) {
        $.each(addedStopWords, function (k, v) {
            if ($.inArray(v, current_stop_words) === -1) {
                current_stop_words.push(v);
                $('.sw-add-container.sw-added-words .sw-words').append(`
                        <div class="sw-added-word dynamic">
                            <span>${v}</span>
                        </div>
                    `);
            }
        });
    },
    createNewStopWords: function () {
        $('.sw-create-new').on('click', function () {
            $('.sw-add-container.sw-added-words .sw-words').html('');
            $('.sw-upload-name-container').html('N/A');
            $('textarea[name="stop_words"]').val('');
            $('input[name="stop_words_file"]').val('');
            current_stop_words = [];
        });
    },
    uploadStopWords: function () {
        $('.sw-upload').on('click', function () {
            $('input[name="stop_words_file"]').trigger('click');
        });
        $('input[name="stop_words_file"]').on('change', function () {
            if (!$(this).val().length) {
                return false;
            }
            $('.sw-upload-name-container').html( $(this).val().replace(/C:\\fakepath\\/i, ''));
            let file = $('input[name="stop_words_file"]')[0].files[0];
            let textType = /text.*/;

            if (file.type.match(textType)) {
                let reader = new FileReader();

                reader.onload = function(e) {
                    process.appendStopWords(reader.result.split(","));
                };

                reader.readAsText(file);
            } else {
                $('.sw-upload-name-container').html("File not supported");
            }
        });
    },
    downloadCleanData: function () {
        let el = $('.download-cleaned-data');
        el.on('click', function () {
            if (el.hasClass("card-disabled")) {
                return false;
            }
            let options = {
                "remove_symbols": $('input[name="remove_symbols"]').is(":checked") ? 1 : 0,
                "remove_numbers": $('input[name="remove_numbers"]').is(":checked") ? 1 : 0,
                "remove_duplicates": $('input[name="remove_duplicates"]').is(":checked") ? 1 : 0,
            };
            let settings = {
                "number_topics": $('input[name="number_topics"]').val(),
                "number_iterations": $('input[name="number_iterations"]').val(),
                "number_words": $('input[name="number_words"]').val(),
                "optimization_interval": $('input[name="optimization_interval"]').val(),
                "model_name": $('input[name="model_name"]').val(),
            };

            let DRRM = 'drrm_strategies';
            let element = $('input[name="category"]');
            let dataCat = $('input[name="data_category"]:checked');
            if (dataCat.val() !== DRRM) {
                element = $('input[name="data_category"]');
            }
            if (!dataCat.length) {
                return false;
            }
            let categories = [];
            $.each(element, function (key, val) {
                if ($(this).is(':checked')) {
                    categories.push($(this).val());
                }
            });
            let formData = new FormData();
            formData.append('data_category', dataCat.val());
            formData.append('category', JSON.stringify(categories));
            formData.append('options', JSON.stringify(options));
            formData.append('stop_words', current_stop_words.join(","));
            formData.append('settings', JSON.stringify(settings));
            if ($('input[name="upload_processed_data_file"]')[0].files[0] !== undefined)
                formData.append(
                    'upload_processed_data_file',
                    $('input[name="upload_processed_data_file"]')[0].files[0]
                );

            app.ajax_upload(`${api_url}/v1/management/answers/clean-data`, 'post', formData, false, true,function (response) {
                let link = document.createElement("a");
                link.download = response.name;
                link.href = "data:application/octet-stream," + encodeURIComponent(response.topic);
                link.click();
            });
        });
    },
    showEnumerations: function () {
        let el = $('.show-enumerations');
        el.on('click', function () {
            if (el.hasClass("card-disabled")) {
                return false;
            }
            let options = {
                "remove_symbols": $('input[name="remove_symbols"]').is(":checked") ? 1 : 0,
                "remove_numbers": $('input[name="remove_numbers"]').is(":checked") ? 1 : 0,
                "remove_duplicates": $('input[name="remove_duplicates"]').is(":checked") ? 1 : 0,
            };
            let settings = {
                "number_topics": $('input[name="number_topics"]').val(),
                "number_iterations": $('input[name="number_iterations"]').val(),
                "number_words": $('input[name="number_words"]').val(),
                "optimization_interval": $('input[name="optimization_interval"]').val(),
                "model_name": $('input[name="model_name"]').val(),
            };

            let DRRM = 'drrm_strategies';
            let element = $('input[name="category"]');
            let dataCat = $('input[name="data_category"]:checked');
            if (dataCat.val() !== DRRM) {
                element = $('input[name="data_category"]');
            }
            if (!dataCat.length) {
                return false;
            }
            let categories = [];
            $.each(element, function (key, val) {
                if ($(this).is(':checked')) {
                    categories.push($(this).val());
                }
            });
            let formData = new FormData();
            formData.append('data_category', dataCat.val());
            formData.append('category', JSON.stringify(categories));
            formData.append('options', JSON.stringify(options));
            formData.append('stop_words', current_stop_words.join(","));
            formData.append('settings', JSON.stringify(settings));
            if ($('input[name="upload_processed_data_file"]')[0].files[0] !== undefined)
                formData.append(
                    'upload_processed_data_file',
                    $('input[name="upload_processed_data_file"]')[0].files[0]
                );

            app.ajax_upload(`${api_url}/v1/management/answers/enumerations`, 'post', formData, false, true,function (response) {
                let totals = [];
                totals['total_raw'] = 0;
                totals['symbols'] = 0;
                totals['numbers'] = 0;
                totals['duplicates'] = 0;
                totals['stop_words'] = 0;
                totals['cleaned_num_words'] = 0;
                $('.enumerations table tbody').html('');
                $.each(response, function(key, val) {
                    $('.enumerations table tbody').append(`
                        <tr>
                            <td>${key}</td>
                            <td>${process.numberFormat(val.raw_num_words)}</td>
                            <td>${process.numberFormat(val.symbols)}</td>
                            <td>${process.numberFormat(val.numbers)}</td>
                            <td>${process.numberFormat(val.duplicates)}</td>
                            <td>${process.numberFormat(val.stop_words)}</td>
                            <td>${process.numberFormat(val.cleaned_num_words)}</td>
                        </tr>
                    `);
                    totals['total_raw'] += val.raw_num_words;
                    totals['symbols'] += !isNaN(val.symbols) ? val.symbols : 0;
                    totals['numbers'] += !isNaN(val.numbers) ? val.numbers : 0;
                    totals['duplicates'] += !isNaN(val.duplicates) ? val.duplicates : 0;
                    totals['stop_words'] += val.stop_words;
                    totals['cleaned_num_words'] += val.cleaned_num_words;
                });
                $('.enumerations table tbody').append(`
                    <tr>
                        <td>Total</td>
                        <td>${process.numberFormat(totals['total_raw'])}</td>
                        <td>${process.numberFormat(totals['symbols'])}</td>
                        <td>${process.numberFormat(totals['numbers'])}</td>
                        <td>${process.numberFormat(totals['duplicates'])}</td>
                        <td>${process.numberFormat(totals['stop_words'])}</td>
                        <td>${process.numberFormat(totals['cleaned_num_words'])}</td>
                    </tr>
                `);
            });
        });
    },
    numberFormat: function (val) {
        try {
            return ((val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace(/\.00$/,'');
        } catch (e) {
            return val;
        }
    },
    uploadProcessedData: function () {
        $('input[name="upload_processed_data_file"]').on('change', function () {
            let file = $('input[name="upload_processed_data_file"]')[0].files[0];
            let textType = /text.*/;
            if (file.type.match(textType)) {
                $('.upload_processed_data_file_name').html( $(this).val().replace(/C:\\fakepath\\/i, ''));
                $('#upload_processed_data').prop('checked', true);
                $('.download-cleaned-data').removeClass("card-disabled");
                $('.show-enumerations').removeClass("card-disabled");
            } else {
                $('.upload_processed_data_file_name').html("<div class='text-center'>File not supported</div>");
                $('.download-cleaned-data').addClass("card-disabled");
                $('.show-enumerations').addClass("card-disabled");
            }
        });
    },
    pyLDAVis: function (parsed, tableClass, numberOfWords, header) {
        if (isNaN(numberOfWords)) {
            numberOfWords = 10;
        }
        let freq = parsed.mdsDat.Freq;
        let category = parsed.tinfo.Category;
        let terms = parsed.tinfo.Term;
        let tinfoFreq = parsed.tinfo.Freq;
        let frequency = [];
        let models = [];

        for (let val in freq) {
            frequency.push(freq[val] * 0.01);
        }
        for (let i = 0; i < category.length; i++) {
            if (models[category[i]] === undefined) {
                models[category[i]] = [];
            }
            models[category[i]][i] = {model:terms[i], frequency:tinfoFreq[i]};
        }
        for (let i in models) {
            models[i].sort((a, b) => parseFloat(b.frequency) - parseFloat(a.frequency));
        }
        let element = $(`.thematic-analysis-table table tbody.${tableClass}`);
        element.html('');
        let html = '';
        let hws_keys = [];
        for (let i in frequency) {
            let c = models[`Topic${parseInt(i)+1}`].filter(x => x).length;
            let newModel = models[`Topic${parseInt(i)+1}`];
            let firstFive = newModel.slice(0, numberOfWords);
            let firstFiveN = Math.floor(numberOfWords * 0.50);
            firstFive = firstFive.sort(function(){return .5 - Math.random()});
            firstFive = firstFive.slice(0, firstFiveN);
            if (c > 50) {
                let toRemove = Math.floor((c-30) * 0.75);
                newModel = newModel.slice(0,c-toRemove);
            }
            let firstFiveModels = firstFive.map(e => e.model);
            let firstFiveModel = firstFiveModels.join(", ");
            let shuffled = models[`Topic${parseInt(i)+1}`].sort(function(){return .5 - Math.random()});
            let randomModels = shuffled.slice(0, numberOfWords);
            let randomModel = randomModels.map(e => e.model);
            let modex = firstFiveModels.concat(randomModel);
            let hitwordsx = [];
            let ched = [];
            $.each(hitwords, function (x, v) {
                $.each(v['sdg'], function (index, value) {
                    let sdgLength = 0;
                    let data = value['data'].join(" ");
                    let newData = data.split(" ");
                    $.each(newData, function (key, val) {
                        if (modex.includes(val.toLowerCase())) {
                            sdgLength++;
                        }
                    });
                    hitwordsx.push({ sdg: index, ppa: value['ppa'], vLength: sdgLength });
                });
                $.each(v['ched'], function (index, value) {
                    let chedLength = 0;
                    let data = value.join(" ");
                    let newData = data.split(" ");
                    let newArr = [];
                    $.each(newData, function (key, val) {
                        if (modex.includes(val.toLowerCase()) && !newArr.includes(val.toLowerCase())) {
                            newArr.push(val.toLowerCase);
                            chedLength++;
                        }
                    });
                    ched.push(chedLength);
                });
            });
            let label = 'No Label';
            let ppa = '';
            let maxLength = 0;
            $.each(hitwordsx, function (index, value) {
                if (value.vLength > maxLength) {
                    label = value.sdg;
                    ppa = value.ppa;
                    maxLength = value.vLength;
                }
            });
            html += `
                <tr>
                    <td>${i}</td>
                    <td>
                        <input type="text" name="topic_label[]" value="" data-value="${label}">
                        <span class="topic_label_txt" style="display: none;">${label}</span>
                    </td>
                    <td>${frequency[i]}</td>
                    <td>${randomModel.join(", ")}</td>
                    <td class="label-topic-paa-td" style="display: none;" data-value="${ppa}" data-default="${ppa}">
                        ${ppa}
                    </td>
                    <td class="label-topic-ched-td" style="display: none;text-align: center !important;" data-value="${ppa}" data-default="${ppa}">
                        ${ched[0] > 0 ? '✓' : ''}
                    </td>
                    <td class="label-topic-ched-td" style="display: none;text-align: center !important;" data-value="${ppa}" data-default="${ppa}">
                        ${ched[1] > 0 ? '✓' : ''}
                    </td>
                    <td class="label-topic-ched-td" style="display: none; text-align: center !important;" data-value="${ppa}" data-default="${ppa}">
                        ${ched[2] > 0 ? '✓' : ''}
                    </td>
                </tr>
            `;
        }
        element.append(html);

        if ($('input[name="label-topic"]').is(':checked')) {
            $('.label-topic-paa').show();
            $('.label-topic-ched').show();
            $('.label-topic-paa-td').show();
            $('.label-topic-ched-td').show();
            $.each($('input[name="topic_label[]"]'), function (k, v) {
                $(this).val($(this).data('value'));
            });
            $.each($('.label-topic-paa-td'), function (k, v) {
                $(this).html($(this).data('value'));
            });
        } else {
            $('.label-topic-paa').hide();
            $('.label-topic-ched').hide();
            $('.label-topic-paa-td').hide();
            $.each($('input[name="topic_label[]"]'), function (k, v) {
                $(this).val('');
            });
            $.each($('.label-topic-paa-td'), function (k, v) {
                $(this).html($(this).data('default'));
            });
        }
    },

    topicLabeling: function () {
        $('.label-topic-paa').hide();
        $('.label-topic-paa-td').hide();
        $('input[name="label-topic"]').on('change', function () {
            if (this.checked) {
                $('.label-topic-paa').show();
                $('.label-topic-paa-td').show();
                $.each($('input[name="topic_label[]"]'), function (k, v) {
                    $(this).val($(this).data('value'));
                });
                $.each($('.label-topic-paa-td'), function (k, v) {
                    $(this).html($(this).data('value'));
                });
            } else {
                $('.label-topic-paa').hide();
                $('.label-topic-paa-td').hide();
                $.each($('input[name="topic_label[]"]'), function (k, v) {
                    $(this).val('');
                });
                $.each($('.label-topic-paa-td'), function (k, v) {
                    $(this).html($(this).data('default'));
                });
            }
        });
    },
    viewLabelList: function () {
        let html = '<h3>SDG</h3>';
        $('#labelList .modal-body').html(html);
        $.each(hitwords, function (x, v) {
            $.each(v['sdg'], function (index, value) {
            if (v !== undefined && v !== null) {
                let elementId2 = Math.random().toString(36).substring(5);
                let values = value['data'].join(', ');
                html += `
                        <div class="panel-group" id="accordion_${elementId2}" style="margin-bottom: 0;">
                            <div class="panel panel-default">
                                <div class="panel-heading" style="position: relative;">
                                    <h4 class="panel-title">
                                        <a data-toggle="collapse" class="ahref_${elementId2}" data-parent="#accordion_${elementId2}" href="#collapse_${elementId2}" style="margin-left: 10px; color: #4c4c4c; font-size: 15px;">
                                            ${index}
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapse_${elementId2}" class="panel-collapse collapse">
                                    <div class="panel-footer" style="padding-left: 30px; color: #4c4c4c; font-size: 13px;border-top: 1px solid #ddd;">Hitwords</div>
                                    <div class="panel-body" style="margin-left: 15px; color: #4c4c4c; font-size: 12px;border-top: 0;">${values}</div>
                                    <div class="panel-footer" style="padding-left: 30px; color: #4c4c4c; font-size: 13px;border-top: 1px solid #ddd;">Goal</div>
                                    <div class="panel-body" style="margin-left: 15px; color: #4c4c4c; font-size: 12px;border-top: 0;">${value['ppa']}</div>
                                </div>
                            </div>
                        </div>`;
            }
                // <div className="action-label">
                //     <div className="update-label-${elementId2} update-label" data-id="${elementId2}" data-label="${x}"
                //          data-key="${x}">Update
                //     </div>
                //     <div className="delete-label-${elementId2} delete-label" data-id="${elementId2}" data-label="${x}"
                //          data-key="${x}">Delete
                //     </div>
                // </div>
            });
            html += `<h3>CHED</h3>`
            $.each(v['ched'], function (index, value) {
            if (v !== undefined && v !== null) {
                let elementId3 = Math.random().toString(36).substring(5);
                let values = value.join(', ');
                html += `
                        <div class="panel-group" id="accordion_${elementId3}" style="margin-bottom: 0;">
                            <div class="panel panel-default">
                                <div class="panel-heading" style="position: relative;">
                                    <h4 class="panel-title">
                                        <a data-toggle="collapse" class="ahref_${elementId3}" data-parent="#accordion_${elementId3}" href="#collapse_${elementId3}" style="margin-left: 10px; color: #4c4c4c; font-size: 15px;">
                                            ${index}
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapse_${elementId3}" class="panel-collapse collapse">
                                    <div class="panel-footer" style="padding-left: 30px; color: #4c4c4c; font-size: 13px;border-top: 1px solid #ddd;">Hitwords</div>
                                    <div class="panel-body" style="margin-left: 15px; color: #4c4c4c; font-size: 12px;border-top: 0;">${values}</div>
                                    <div class="panel-footer" style="padding-left: 30px; color: #4c4c4c; font-size: 13px;border-top: 1px solid #ddd;">Goal</div>
                                    <div class="panel-body" style="margin-left: 15px; color: #4c4c4c; font-size: 12px;border-top: 0;">${value['ppa'] !== undefined ? value['ppa'] : ''}</div>
                                </div>
                            </div>
                        </div>`;
            }
            });
        });
        $('#labelList .modal-body').html(html);
    },
    modalLabelList: function() {
        $('.view-label-list').on('click', function () {
            process.viewLabelList();
            $('#labelList').modal('show');
        });
        $('#labelList').on('click', '.update-label', function () {
            $('#labelUpdateActionModal .update_label_id').val('');
            $('#labelUpdateActionModal .update_label_name').val('');
            $('#labelUpdateActionModal .update_hitwords').val('');
            $('#labelUpdateActionModal .update_ppas').val('');
            let label = $(this).data('label');
            let key = $(this).data('key');
            $('#labelUpdateActionModal').modal('show');
            $('#labelUpdateActionModal .update_label_id').val(key);
            $('#labelUpdateActionModal .update_label_name').val(hitwords[label][0]);
            $('#labelUpdateActionModal .update_hitwords').val(hitwords[label][1]);
            $('#labelUpdateActionModal .update_ppas').val(hitwords[label][2]);
        });
        $('#labelUpdateActionModal .submit-update-label').on('click', function () {
            let key = $('#labelUpdateActionModal .update_label_id').val();
            let label = $('#labelUpdateActionModal .update_label_name').val();
            let hw = $('#labelUpdateActionModal .update_hitwords').val();
            let ppas = $('#labelUpdateActionModal .update_ppas').val();
            hitwords[key][0] = label;
            hitwords[key][1] = hw;
            hitwords[key][2] = ppas;
            process.updateJsonFile();
            swal("Done!", "It was successfully updated!", "success");
            $('#labelUpdateActionModal').modal('hide');
        });
        $('#labelAddActionModal .submit-add-label').on('click', function () {
            let sdg = $('#labelAddActionModal #sdg').val();
            let label = $('#labelAddActionModal .add_label_name').val();
            let hw = $('#labelAddActionModal .add_hitwords').val();
            let ppas = $('#labelAddActionModal .add_ppas').val();
            let system_integration = $('#labelAddActionModal .system_integration')
            let application_development = $('#labelAddActionModal .application_development')
            let software_engineering = $('#labelAddActionModal .software_engineering')
            hw = hw.split(",");
            hw = hw.map(s => s.trim());
            hitwords.data.sdg[sdg].data = hitwords.data.sdg[sdg].data.concat(hw);
            if (system_integration.is(":checked")) {
                hitwords.data.ched[system_integration.val()] = hitwords.data.ched[system_integration.val()].concat(hw);
            }
            if (application_development.is(":checked")) {
                hitwords.data.ched[application_development.val()] = hitwords.data.ched[application_development.val()].concat(hw);
            }
            if (software_engineering.is(":checked")) {
                hitwords.data.ched[software_engineering.val()] = hitwords.data.ched[software_engineering.val()].concat(hw);
            }
            process.updateJsonFile();
            swal("Done!", "It was successfully added!", "success");
            $('#labelAddActionModal').modal('hide');
            $('#labelAddActionModal #sdg').val('');
            $('#labelAddActionModal .add_label_name').val('');
            $('#labelAddActionModal .add_hitwords').val('');
            $('#labelAddActionModal .add_ppas').val('');
            system_integration.val('');
            application_development.val('');
            software_engineering.val('');
        });
        $('#labelList').on('click', '.delete-label', function () {
            let id = $(this).data('id');
            let label = $(this).data('label');
            let key = $(this).data('key');
            swal({
                    title: "Are you sure to delete ?",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it !!",
                    closeOnConfirm: false
                },
                function(){
                    swal("Deleted !!", "", "success");
                    $(`#accordion_${id}`).remove();
                    delete hitwords[label];
                    process.updateJsonFile();
                });
        });
    },

    updateJsonFile: function() {
        app.ajax_json(`${base_url}/topic-label`, 'post', JSON.stringify({topic_label:hitwords}), function (data) {
            process.viewLabelList();
        });
    }

};
$(document).ready(function() {
    process.init();
    $( document ).ajaxStop(function() {
        app.removeLoader();
    });
});