<!-- /**
 * Note that our recommendations, report, and code samples being shared
 * (“Samples”) are not Ddrive products,and Ddrive will not support such Samples.
 * Samples are offered on as-is basis, and designed only to provide you with
 * certain examples of how such code samples could be utilized. Ddrive does not
 * provide any representation and warranty in relation to Samples.
 *
 * By implementing any of Samples, you agree to solely assume all responsibility
 * for any consequences that arise from such implementation.
 *
 * It is your responsibility to check that the form and content of your property
 * meet all applicable technical, security, legal, and any other compliance
 * requirements.
 */ -->
<script type="text/javascript">

    const clientId = "<your-client-id>.apps.googleusercontent.com";
    const scope = ['https://www.googleapis.com/auth/drive.file'];

    let pickerApiLoaded = false;
    let oauthToken = null;


    function showPicker() {

        // 初期化が完了していれば、Picker生成
        if (pickerApiLoaded && oauthToken) {
            createPicker();
            return;
        }

        // Auth未初期化の場合は初期化
        if ( !oauthToken ) {
            gapi.load('auth', {'callback': onAuthApiLoad});
        }

        // Picker API 未ロードの場合はロード
        if ( !pickerApiLoaded ) {
            gapi.load('picker', {'callback': onPickerApiLoad});
        }

    }


    function onAuthApiLoad() {

        // Auth初期化
        window.gapi.auth.authorize( {
            'client_id': clientId,
            'scope': scope,
            'immediate': false
        }, function(authResult) {
            if (authResult && !authResult.error) {
                // 取得したアクセストークンを保持
                oauthToken = authResult.access_token;

                // 初期化が完了したら、Picker生成
                createPicker();
            }
        });

    }


    function onPickerApiLoad() {

        // Picker APIがロードされたらフラグを立てる     
        pickerApiLoaded = true;

        // ロードが完了したら、Picker生成
        createPicker();

    }


    function createPicker() {

        //  初期化が完了していればPicker生成        
        if (pickerApiLoaded && oauthToken) {
            let picker = new google.picker.PickerBuilder().
                addView(google.picker.ViewId.DOCS).
                setOAuthToken(oauthToken).
                setDeveloperKey(developerKey).
                setCallback(pickerCallback).
                build();

            // Picker表示
            picker.setVisible(true);
        }

    }


    function pickerCallback(data) {

        let url = 'nothing';
        document.getElementById('picker_result').innerHTML = '';
        if (data.action == 'picked' ) {
            let doc = data.docs[0];
            if ( doc ) {
                // ...
            }
        }

    }

</script>
<script type="text/javascript" src="https://apis.google.com/js/api.js"></script>
