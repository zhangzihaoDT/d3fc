import d3 from 'd3';

// Renders a bar series as an SVG path based on the given array of datapoints. Each
// bar has a fixed width, whilst the x, y and height are obtained from each data
// point via the supplied accessor functions.
export default function() {

    var x = function(d, i) { return d.x; },
        y = function(d, i) { return d.y; },
        horizontalAlign = 'center',
        verticalAlign = 'center',
        height = function(d, i) { return d.height; },
        width = d3.functor(3);

    var bar = function(context, data, index) {

        data.forEach(function(d, i) {
            var xValue = x.call(this, d, index || i),
                yValue = y.call(this, d, index || i),
                barHeight = height.call(this, d, index || i),
                barWidth = width.call(this, d, index || i);

            var horizontalOffset;
            switch (horizontalAlign) {
            case 'left':
                horizontalOffset = barWidth;
                break;
            case 'right':
                horizontalOffset = 0;
                break;
            case 'center':
                horizontalOffset = barWidth / 2;
                break;
            default:
                throw new Error('Invalid horizontal alignment ' + horizontalAlign);
            }

            var verticalOffset;
            switch (verticalAlign) {
            case 'bottom':
                verticalOffset = -barHeight;
                break;
            case 'top':
                verticalOffset = 0;
                break;
            case 'center':
                verticalOffset = barHeight / 2;
                break;
            default:
                throw new Error('Invalid vertical alignment ' + verticalAlign);
            }

            context.rect(
                xValue - horizontalOffset,
                yValue - verticalOffset,
                barWidth,
                barHeight
            );
        }, this);

        return context.toString();
    };

    bar.x = function(_x) {
        if (!arguments.length) {
            return x;
        }
        x = d3.functor(_x);
        return bar;
    };
    bar.y = function(_x) {
        if (!arguments.length) {
            return y;
        }
        y = d3.functor(_x);
        return bar;
    };
    bar.width = function(_x) {
        if (!arguments.length) {
            return width;
        }
        width = d3.functor(_x);
        return bar;
    };
    bar.horizontalAlign = function(_x) {
        if (!arguments.length) {
            return horizontalAlign;
        }
        horizontalAlign = _x;
        return bar;
    };
    bar.height = function(_x) {
        if (!arguments.length) {
            return height;
        }
        height = d3.functor(_x);
        return bar;
    };
    bar.verticalAlign = function(_x) {
        if (!arguments.length) {
            return verticalAlign;
        }
        verticalAlign = _x;
        return bar;
    };
    return bar;

}