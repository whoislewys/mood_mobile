let {moving} = this.state;
let {currentTime, duration, percent} = this.props;
return <View style={styles.view}>
    <View style={styles.barView}>
        <View style={{flex: 1, flexDirection: "row", top: moving ? radiusOfActiveHolder : radiusOfHolder}}>
            <TouchableOpacity style={[styles.line, {flex: percent, borderColor: "blue"}]}
                              onPress={this.onLinePressed.bind(this)}/>
            <TouchableOpacity style={[styles.line, {flex: 100 - percent, borderColor: "white"}]}
                              onPress={this.onLinePressed.bind(this)}/>
        </View>
        <Animated.View style={this.getHolderStyle()}/>
    </View>
    <Text style={[styles.timeText, {marginLeft: 10}]}>{this.formatSeconds(duration)}</Text>
</View>
