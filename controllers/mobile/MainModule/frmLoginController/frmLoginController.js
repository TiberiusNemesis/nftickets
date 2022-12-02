define({

  elapsedSeconds: 0,
  onPostShow: function () {
    this.view.btnSubmit.onClick = this.btnSubmit_onClick.bind(this);
  },
  btnSubmit_onClick: function () {
    kony.application.showLoadingScreen();
    kony.timer.schedule("presentationFluffTimer", this.presentationFluffTimer, 1, true);
  },
  presentationFluffTimer: function () {
    this.elapsedSeconds = this.elapsedSeconds + 1;
    if (this.elapsedSeconds >= 3) {
      kony.application.dismissLoadingScreen();
      const navigation = new kony.mvc.Navigation("frmDashboard");
      kony.timer.cancel("presentationFluffTimer");
      navigation.navigate({});
    }
  }
});